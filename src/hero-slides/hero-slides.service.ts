import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHeroSlideDto } from './dto/create-hero-slide.dto';
import { HeroSlide } from './entities/hero-slide.entity';
import { unlink } from 'fs/promises'; // Para borrar archivos
import { join } from 'path';
import { UpdateHeroSlideDto } from './dto/update-hero-slide.dto';

@Injectable()
export class HeroSlidesService {
  constructor(
    @InjectRepository(HeroSlide)
    private readonly slideRepository: Repository<HeroSlide>,
  ) {}

  async create(createDto: CreateHeroSlideDto, imagen: Express.Multer.File): Promise<HeroSlide> {
    if (!imagen) {
      throw new BadRequestException('El archivo de imagen es requerido');
    }
    
    const imagenUrl = `/hero/${imagen.filename}`;
    const nuevoSlide = this.slideRepository.create({
      ...createDto,
      imagenUrl,
    });
    
    return this.slideRepository.save(nuevoSlide);
  }

  async update(id: string, updateDto: UpdateHeroSlideDto, nuevaImagen?: Express.Multer.File): Promise<HeroSlide> {
    const slide = await this.slideRepository.preload({
      id,
      ...updateDto,
    });

    if (!slide) {
      throw new NotFoundException(`Slide con ID "${id}" no encontrado.`);
    }

    if (nuevaImagen) {
      if (slide.imagenUrl) {
        try {
          const oldImagePath = join(__dirname, '..', '..', 'uploads', slide.imagenUrl);
          await unlink(oldImagePath);
        } catch (error) {
          console.error('No se pudo borrar la imagen anterior:', error.message);
        }
      }
      slide.imagenUrl = `/hero/${nuevaImagen.filename}`;
    }
    
    return this.slideRepository.save(slide);
  }

findAll(): Promise<HeroSlide[]> {
    // ▼▼▼ ESTA LÍNEA ES LA CLAVE ▼▼▼
    // Le dice a la base de datos que ordene los slides por el campo 'orden'
    // de forma ASCENDENTE (el número más bajo primero).
    return this.slideRepository.find({
      order: { orden: 'ASC' },
    });
  }

  async remove(id: string): Promise<void> {
    const slide = await this.slideRepository.findOneBy({ id });
    if (!slide) {
      throw new NotFoundException(`Slide con ID "${id}" no encontrado`);
    }
    
    // Borrar el archivo de imagen del servidor
    try {
      const imagePath = join(__dirname, '..', '..', 'uploads', slide.imagenUrl);
      await unlink(imagePath);
    } catch (error) {
      console.error('Error al borrar la imagen del slide:', error.message);
    }

    await this.slideRepository.remove(slide);
  }
}
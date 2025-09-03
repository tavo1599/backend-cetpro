import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHeroSlideDto } from './dto/create-hero-slide.dto';
import { HeroSlide } from './entities/hero-slide.entity';
import { unlink } from 'fs/promises'; // Para borrar archivos
import { join } from 'path';

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

  findAll(): Promise<HeroSlide[]> {
    // Los devuelve ordenados por el campo 'orden'
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
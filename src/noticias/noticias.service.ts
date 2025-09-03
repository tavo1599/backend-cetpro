import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNoticiaDto } from './dto/create-noticia.dto';
import { Noticia } from './entities/noticia.entity';
import { unlink } from 'fs/promises';
import { join } from 'path';
import { UpdateNoticiaDto } from './dto/update-noticia.dto';

@Injectable()
export class NoticiasService {
  constructor(
    @InjectRepository(Noticia)
    private readonly noticiaRepository: Repository<Noticia>,
  ) {}

  async create(createNoticiaDto: CreateNoticiaDto, imagen: Express.Multer.File): Promise<Noticia> {
    if (!imagen) {
      throw new BadRequestException('El archivo de imagen es requerido');
    }

    const imagenUrl = `/noticias/${imagen.filename}`;
    const nuevaNoticia = this.noticiaRepository.create({
      ...createNoticiaDto,
      imagenUrl,
    });
    
    return this.noticiaRepository.save(nuevaNoticia);
  }

  async update(id: string, updateNoticiaDto: UpdateNoticiaDto, nuevaImagen?: Express.Multer.File): Promise<Noticia> {
    const noticia = await this.noticiaRepository.preload({
      id,
      ...updateNoticiaDto,
    });

    if (!noticia) {
      throw new NotFoundException(`Noticia con ID "${id}" no encontrada.`);
    }

    if (nuevaImagen) {
      if (noticia.imagenUrl) {
        try {
          const oldImagePath = join(__dirname, '..', '..', 'uploads', noticia.imagenUrl);
          await unlink(oldImagePath);
        } catch (error) {
          console.error('No se pudo borrar la imagen anterior:', error.message);
        }
      }
      noticia.imagenUrl = `/noticias/${nuevaImagen.filename}`;
    }

    // La fecha de publicación no se actualiza, se mantiene la original.
    return this.noticiaRepository.save(noticia);
  }

  findAll(): Promise<Noticia[]> {
    // Devuelve las noticias ordenadas por fecha, la más nueva primero
    return this.noticiaRepository.find({
      order: { fechaPublicacion: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Noticia> {
    const noticia = await this.noticiaRepository.findOneBy({ id });
    if (!noticia) {
      throw new NotFoundException(`Noticia con ID "${id}" no encontrada.`);
    }
    return noticia;
  }

  async remove(id: string): Promise<void> {
    const noticia = await this.findOne(id); // Reutilizamos para verificar que existe
    
    try {
      const imagePath = join(__dirname, '..', '..', 'uploads', noticia.imagenUrl);
      await unlink(imagePath);
    } catch (error) {
      console.error('Error al borrar la imagen de la noticia:', error.message);
    }

    await this.noticiaRepository.remove(noticia);
  }
}
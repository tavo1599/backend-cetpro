// src/carreras/carreras.service.ts
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; // CORRECTO: Viene de '@nestjs/typeorm'
import { Repository } from 'typeorm'; // CORRECTO: Viene de 'typeorm'
import { Carrera } from './entities/carrera.entity'; // CORRECTO: Tu entidad
import { CreateCarreraDto } from './dto/create-carrera.dto';
import { UpdateCarreraDto } from './dto/update-carrera.dto';
import { unlink } from 'fs/promises';
import { join } from 'path';

@Injectable()
export class CarrerasService {
  constructor(
    @InjectRepository(Carrera)
    private readonly carreraRepository: Repository<Carrera>,
  ) {}

  // CAMBIO: Este es el único método create, ahora completo.
  async create(createCarreraDto: CreateCarreraDto, imagen: Express.Multer.File) {
    if (!imagen) {
      throw new BadRequestException('El archivo de imagen es requerido');
    }
    
    // El archivo ya se guardó gracias al 'diskStorage' en el controlador.
    // Ahora solo guardamos la ruta en la base de datos.
    const imagenUrl = `/carreras/${imagen.filename}`;

    const nuevaCarrera = this.carreraRepository.create({
      ...createCarreraDto,
      imagenUrl,
    });
    
    return this.carreraRepository.save(nuevaCarrera);
  }

  // CAMBIO: Implementada la lógica real para buscar todas las carreras.
  findAll(): Promise<Carrera[]> {
    return this.carreraRepository.find();
  }

  // CAMBIO: Implementada la lógica para buscar una carrera por su ID (UUID).
  async findOne(id: string): Promise<Carrera> {
    const carrera = await this.carreraRepository.findOneBy({ id });
    if (!carrera) {
      throw new NotFoundException(`La carrera con el ID "${id}" no fue encontrada`);
    }
    return carrera;
  }

  async update(id: string, updateCarreraDto: UpdateCarreraDto, nuevaImagen?: Express.Multer.File): Promise<Carrera> {
    const carrera = await this.carreraRepository.preload({
      id,
      ...updateCarreraDto,
    });

    if (!carrera) {
      throw new NotFoundException(`Carrera con ID "${id}" no encontrada.`);
    }

    // Si se sube una nueva imagen
    if (nuevaImagen) {
      // Borramos la imagen anterior para no acumular basura
      if (carrera.imagenUrl) {
        try {
          const oldImagePath = join(__dirname, '..', '..', 'uploads', carrera.imagenUrl);
          await unlink(oldImagePath);
        } catch (error) {
          console.error('No se pudo borrar la imagen anterior:', error.message);
        }
      }
      // Asignamos la nueva URL de imagen
      carrera.imagenUrl = `/carreras/${nuevaImagen.filename}`;
    }

    return this.carreraRepository.save(carrera);
  }

  // CAMBIO: Implementada la lógica para eliminar una carrera.
  async remove(id: string): Promise<void> {
    const carrera = await this.findOne(id); // Reutilizamos findOne para verificar que existe
    await this.carreraRepository.remove(carrera);
  }
}
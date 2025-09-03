// src/carreras/carreras.service.ts
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; // CORRECTO: Viene de '@nestjs/typeorm'
import { Repository } from 'typeorm'; // CORRECTO: Viene de 'typeorm'
import { Carrera } from './entities/carrera.entity'; // CORRECTO: Tu entidad
import { CreateCarreraDto } from './dto/create-carrera.dto';
import { UpdateCarreraDto } from './dto/update-carrera.dto';

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

  // CAMBIO: Implementada la lógica para actualizar una carrera.
  async update(id: string, updateCarreraDto: UpdateCarreraDto): Promise<Carrera> {
    // preload busca la carrera y la carga con los nuevos datos del DTO
    const carrera = await this.carreraRepository.preload({
      id: id,
      ...updateCarreraDto,
    });

    if (!carrera) {
      throw new NotFoundException(`La carrera con el ID "${id}" no fue encontrada para actualizar`);
    }
    
    // Aquí podrías agregar la lógica para actualizar la imagen si se envía una nueva.

    return this.carreraRepository.save(carrera);
  }

  // CAMBIO: Implementada la lógica para eliminar una carrera.
  async remove(id: string): Promise<void> {
    const carrera = await this.findOne(id); // Reutilizamos findOne para verificar que existe
    await this.carreraRepository.remove(carrera);
  }
}
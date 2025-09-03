// src/carreras/carreras.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // CORRECTO: Viene de '@nestjs/typeorm'
import { CarrerasService } from './carreras.service';
import { CarrerasController } from './carreras.controller';
import { Carrera } from './entities/carrera.entity'; // CORRECTO: Viene del archivo que creaste

@Module({
  imports: [
    TypeOrmModule.forFeature([Carrera]) // CORRECTO: Así se registra la entidad en este módulo
  ],
  controllers: [CarrerasController],
  providers: [CarrerasService],
})
export class CarrerasModule {}
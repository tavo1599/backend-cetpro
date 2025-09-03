// src/hero-slides/dto/create-hero-slide.dto.ts

import { IsString, IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer'; // <-- 1. IMPORTA ESTO

export class CreateHeroSlideDto {
  @IsOptional()
  @IsString()
  titulo?: string;

  @IsOptional()
  @IsString()
  subtitulo?: string;

  @IsOptional()
  @IsString()
  textoBoton?: string;

  @IsOptional()
  @IsString()
  enlaceBoton?: string;

  // ▼▼▼ AÑADE EL DECORADOR @Type() AQUÍ ▼▼▼
  @IsOptional()
  @Type(() => Number) // 2. Fuerza la transformación a número
  @IsNumber()
  orden?: number;
}
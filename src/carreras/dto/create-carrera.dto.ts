// src/carreras/dto/create-carrera.dto.ts
import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreateCarreraDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  titulo: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;
  
  // No incluimos la imagen aquí porque se manejará como un archivo aparte
}
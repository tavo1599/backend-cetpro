import { IsString, IsOptional, IsNumber } from 'class-validator';

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

  @IsOptional()
  @IsNumber()
  orden?: number;
}
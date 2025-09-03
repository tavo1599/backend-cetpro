import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateNoticiaDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  titulo: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;
}
import { PartialType } from '@nestjs/mapped-types';
import { CreateCarreraDto } from './create-carrera.dto';

// PartialType toma todas las validaciones de CreateCarreraDto y las hace opcionales.
export class UpdateCarreraDto extends PartialType(CreateCarreraDto) {}
// src/carreras/carreras.controller.ts

import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  UseInterceptors,       // <-- Importación correcta aquí
  UploadedFile,          // <-- Importación correcta aquí
  ParseUUIDPipe          
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CarrerasService } from './carreras.service';
import { CreateCarreraDto } from './dto/create-carrera.dto';
import { UpdateCarreraDto } from './dto/update-carrera.dto';
import { diskStorage } from 'multer'; // <-- ¡Importa esto!
import { extname } from 'path'; // <-- ¡Importa esto!

@Controller('carreras')
export class CarrerasController {
  constructor(private readonly carrerasService: CarrerasService) {}

  @Post()
  @UseInterceptors(FileInterceptor('imagen', {
    // Configuración de almacenamiento
    storage: diskStorage({
      destination: './uploads/carreras', // Carpeta donde se guardarán las imágenes
      filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        cb(null, `${randomName}${extname(file.originalname)}`); // Genera un nombre de archivo único
      },
    }),
  }))
  create(
    @Body() createCarreraDto: CreateCarreraDto,
    @UploadedFile() imagen: Express.Multer.File,
  ) {
    // IMPORTANTE: Ahora el servicio debe recibir la ruta del archivo, no el archivo completo.
    return this.carrerasService.create(createCarreraDto, imagen);
  }

  // ... (resto de los métodos: findAll, findOne, etc.)
  @Get()
  findAll() {
    return this.carrerasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) { 
    return this.carrerasService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateCarreraDto: UpdateCarreraDto
  ) {
    return this.carrerasService.update(id, updateCarreraDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.carrerasService.remove(id);
  }
}
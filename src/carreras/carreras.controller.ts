import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UseGuards, UploadedFile, ParseUUIDPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { CarrerasService } from './carreras.service';
import { CreateCarreraDto } from './dto/create-carrera.dto';
import { UpdateCarreraDto } from './dto/update-carrera.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('carreras')
export class CarrerasController {
  constructor(private readonly carrerasService: CarrerasService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('imagen', {
    storage: diskStorage({
      destination: './uploads/carreras',
      filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        cb(null, `${randomName}${extname(file.originalname)}`);
      },
    }),
  }))
  create(@Body() createCarreraDto: CreateCarreraDto, @UploadedFile() imagen: Express.Multer.File) {
    return this.carrerasService.create(createCarreraDto, imagen);
  }

  // Esta ruta es pública y no necesita guardia
  @Get()
  findAll() {
    return this.carrerasService.findAll();
  }

  // Esta ruta es pública y no necesita guardia
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.carrerasService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('imagen', {
    storage: diskStorage({
      destination: './uploads/carreras',
      filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        cb(null, `${randomName}${extname(file.originalname)}`);
      },
    }),
  }))
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateCarreraDto: UpdateCarreraDto, @UploadedFile() imagen?: Express.Multer.File) {
    return this.carrerasService.update(id, updateCarreraDto, imagen);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.carrerasService.remove(id);
  }
}
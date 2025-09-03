import { Controller, Get, Post, Body, Param, Delete, UseInterceptors, Patch, UseGuards, UploadedFile, ParseUUIDPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { NoticiasService } from './noticias.service';
import { CreateNoticiaDto } from './dto/create-noticia.dto';
import { UpdateNoticiaDto } from './dto/update-noticia.dto';

@Controller('noticias')
export class NoticiasController {
  constructor(private readonly noticiasService: NoticiasService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('imagen', {
    storage: diskStorage({
      destination: './uploads/noticias', // Carpeta para imágenes de noticias
      filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        cb(null, `${randomName}${extname(file.originalname)}`);
      },
    }),
  }))
  create(
    @Body() createNoticiaDto: CreateNoticiaDto,
    @UploadedFile() imagen: Express.Multer.File,
  ) {
    return this.noticiasService.create(createNoticiaDto, imagen);
  }

  @Get()
  findAll() {
    return this.noticiasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.noticiasService.findOne(id);
  }

   @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('imagen', { /*...tu config de storage...*/ }))
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateNoticiaDto: UpdateNoticiaDto,
    @UploadedFile() imagen?: Express.Multer.File,
  ) {
    return this.noticiasService.update(id, updateNoticiaDto, imagen);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.noticiasService.remove(id);
  }
}
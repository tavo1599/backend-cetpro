import { Controller, Get, Post, Body, Param, Delete, UseInterceptors, UseGuards, UploadedFile, ParseUUIDPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { HeroSlidesService } from './hero-slides.service';
import { CreateHeroSlideDto } from './dto/create-hero-slide.dto';

@Controller('hero-slides')
export class HeroSlidesController {
  constructor(private readonly heroSlidesService: HeroSlidesService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('imagen', {
    storage: diskStorage({
      destination: './uploads/hero', // Nueva carpeta para las imágenes del carrusel
      filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        cb(null, `${randomName}${extname(file.originalname)}`);
      },
    }),
  }))
  create(
    @Body() createHeroSlideDto: CreateHeroSlideDto,
    @UploadedFile() imagen: Express.Multer.File,
  ) {
    return this.heroSlidesService.create(createHeroSlideDto, imagen);
  }

  @Get()
  findAll() {
    return this.heroSlidesService.findAll();
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.heroSlidesService.remove(id);
  }
}
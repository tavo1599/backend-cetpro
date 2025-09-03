// src/hero-slides/hero-slides.module.ts

import { Module } from '@nestjs/common';
import { HeroSlidesService } from './hero-slides.service';
import { HeroSlidesController } from './hero-slides.controller';
import { TypeOrmModule } from '@nestjs/typeorm'; // <-- 1. Importa TypeOrmModule
import { HeroSlide } from './entities/hero-slide.entity'; // <-- 2. Importa tu entidad

@Module({
  // ▼▼▼ 3. AÑADE ESTA LÍNEA 'IMPORTS' ▼▼▼
  imports: [TypeOrmModule.forFeature([HeroSlide])], 
  controllers: [HeroSlidesController],
  providers: [HeroSlidesService],
})
export class HeroSlidesModule {}
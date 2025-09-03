// src/app.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarrerasModule } from './carreras/carreras.module';
import { Carrera } from './carreras/entities/carrera.entity';
import { HeroSlidesModule } from './hero-slides/hero-slides.module';
import { HeroSlide } from './hero-slides/entities/hero-slide.entity';
import { NoticiasModule } from './noticias/noticias.module';
import { Noticia } from './noticias/entities/noticia.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // o 'mysql', 'sqlite', etc.
      host: 'localhost', // La dirección de tu base de datos
      port: 5432,
      username: 'admin',
      password: 'Ogremagic15.',
      database: 'DB_CEPTRO',
      entities: [Carrera, HeroSlide, Noticia], // Aquí puedes añadir más entidades en el futuro
      synchronize: true, // ¡Importante! Esto crea las tablas automáticamente. Desactívalo en producción.
    }),
    CarrerasModule,
    HeroSlidesModule,
    NoticiasModule, // Tu módulo de carreras
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
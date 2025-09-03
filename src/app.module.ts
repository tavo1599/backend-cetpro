import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarrerasModule } from './carreras/carreras.module';
import { Carrera } from './carreras/entities/carrera.entity';
import { HeroSlidesModule } from './hero-slides/hero-slides.module';
import { HeroSlide } from './hero-slides/entities/hero-slide.entity';
import { NoticiasModule } from './noticias/noticias.module';
import { Noticia } from './noticias/entities/noticia.entity';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Ogremagic15.',
      database: 'DB_CEPTRO',
      entities: [Carrera, HeroSlide, Noticia, User],
      synchronize: true,
    }),
    CarrerasModule,
    HeroSlidesModule,
    NoticiasModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
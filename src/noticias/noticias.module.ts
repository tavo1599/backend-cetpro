import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoticiasService } from './noticias.service';
import { NoticiasController } from './noticias.controller';
import { Noticia } from './entities/noticia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Noticia])], // <-- AÑADE ESTO
  controllers: [NoticiasController],
  providers: [NoticiasService],
})
export class NoticiasModule {}
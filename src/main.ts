// src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Configuración de CORS
  const corsOrigin = 'http://localhost:4321';
  app.enableCors({
    origin: corsOrigin,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // ▼▼▼ ESTA ES LA LÍNEA CRUCIAL ▼▼▼
  // Asegúrate de que { transform: true } esté aquí
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }));

  // Configuración de archivos estáticos
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/',
  });

  await app.listen(3000);
}
bootstrap();
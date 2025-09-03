// src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express'; // <-- ¡Importante!

async function bootstrap() {
  // Usa NestExpressApplication para poder usar métodos de express
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Sirve los archivos que están en la carpeta 'uploads/carreras'
  // bajo la ruta URL '/carreras'
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/',
  });

  app.enableCors();

  await app.listen(3000);
}
bootstrap();
// src/users/users.controller.ts

import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Por ahora, no necesitamos ninguna ruta pública para los usuarios.
  // El servicio se usa internamente para la autenticación.
}
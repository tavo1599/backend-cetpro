// src/users/users.service.ts

import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async onModuleInit() {
    await this.createDefaultAdmin();
  }

  // ▼▼▼ CAMBIO AQUÍ ▼▼▼
  // Cambiamos 'undefined' por 'null' para que coincida con TypeORM
  async findOneByEmail(email: string): Promise<User | null> { 
    return this.userRepository.findOneBy({ email });
  }

  async createDefaultAdmin() {
    const adminEmail = 'admin@ceptro.com';
    const adminExists = await this.findOneByEmail(adminEmail);

    if (!adminExists) {
      console.log('Creando usuario administrador por defecto...');
      const adminUser = this.userRepository.create({
        email: adminEmail,
        password: 'admin',
      });
      await this.userRepository.save(adminUser);
      console.log('Usuario administrador creado exitosamente.');
    }
  }
}
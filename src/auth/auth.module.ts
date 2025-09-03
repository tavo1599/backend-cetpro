import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy/jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'tuClaveSecretaSuperDificil123',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  // ▼▼▼ 2. Añade JwtStrategy a los providers ▼▼▼
  providers: [AuthService, JwtStrategy], 
  controllers: [AuthController],
  // ▼▼▼ 3. Exporta PassportModule y JwtModule para que otros módulos puedan usar los guardias ▼▼▼
  exports: [PassportModule, JwtModule],
})
export class AuthModule {}
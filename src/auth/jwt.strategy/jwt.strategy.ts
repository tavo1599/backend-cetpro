// src/auth/jwt.strategy.ts

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() { // <-- Quitamos la inyección de AuthService de aquí
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'tuClaveSecretaSuperDificil123', // Debe ser la misma clave secreta
    });
  }

  // Esta función se ejecuta si el token es válido (firma y expiración correctas)
  async validate(payload: { email: string; sub: string }) {
    // Simplemente devolvemos el contenido del token.
    // El 'AuthGuard' se encargará de añadir esto al objeto 'request'.
    return { userId: payload.sub, email: payload.email };
  }
}
import { Injectable } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
ConfigModule.forRoot({
  envFilePath: './.env',
});

@Injectable()
export default class JwtAccessStrategy extends PassportStrategy(
  Strategy,
  'accessToken'
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.TOKEN,
    });
  }

  async validate(payload: any) {
    return {
      id: payload.userInfo.id,
      email: payload.userInfo.email,
      name: payload.userInfo.name,
      role: payload.userInfo.role,
      is_active: payload.userInfo.is_active,
    };
  }
}

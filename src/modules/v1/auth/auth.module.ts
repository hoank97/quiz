import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from 'src/configs/oAuth2.config';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { RedisCacheModule } from '../cache/redis.module';

@Module({
  imports: [UsersModule, JwtModule, RedisCacheModule],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy],
})
export class AuthModule {}

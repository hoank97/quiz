/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IResponse } from 'src/commons/interfaces';
import { IUser } from '../users/interfaces';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RetrieveTokenDto } from './dto/retrieveToken.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() data: LoginDto): Promise<IResponse<IUser>> {
    return this.authService.login(data.accessToken);
  }

  @Post('access-token')
  async retrieveAccessToken(
    @Body() data: RetrieveTokenDto
  ): Promise<IResponse<string>> {
    return this.authService.retrieveAccessToken(data.refreshToken);
  }
}

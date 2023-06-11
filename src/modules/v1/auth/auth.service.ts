import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Auth, google } from 'googleapis';
import { IResponse } from 'src/commons/interfaces';
import { RedisCacheService } from '../cache/redis.services';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ILogin, IUser } from '../users/interfaces';
import { UsersService } from '../users/users.service';
import { authConstants } from './auth.constants';

@Injectable()
export class AuthService {
  oauth2Client: Auth.OAuth2Client;
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly cache: RedisCacheService
  ) {
    this.oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_SECRET
    );
  }

  async verifyUser(email: string): Promise<IUser | undefined> {
    return this.userService.findByEmail(email);
  }

  async generateToken(userInfo: IUser, expiresIn: string) {
    return this.jwtService.sign(
      {
        userInfo,
      },
      {
        expiresIn,
        secret: process.env.TOKEN,
      }
    );
  }

  async login(token: string): Promise<IResponse<ILogin>> {
    try {
      this.oauth2Client.setCredentials({
        access_token: token,
      });
      const userInfoClient = google.oauth2('v2').userinfo;

      const userInfoResponse = await userInfoClient.get({
        auth: this.oauth2Client,
      });

      const email = userInfoResponse.data.email;
      let userInfo = await this.verifyUser(email);

      if (!userInfo) {
        const name = `${userInfoResponse.data.given_name} ${userInfoResponse.data.family_name}`;
        const body: CreateUserDto = {
          email,
          name,
        };
        userInfo = await this.userService.create(body);
      }

      const accessToken = await this.generateToken(
        userInfo,
        authConstants.jwt.expirationTime.accessToken
      );
      const refreshToken = await this.generateToken(
        userInfo,
        authConstants.jwt.expirationTime.refreshToken
      );

      this.cache.set(userInfo.id.toString(), refreshToken);
      return {
        statusCode: HttpStatus.OK,
        data: {
          ...userInfo,
          refreshToken,
          accessToken,
          avatar: userInfoResponse.data.picture,
        },
      };
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async retrieveAccessToken(refreshToken: string): Promise<IResponse<string>> {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.TOKEN,
      });
      const userInfo = await this.verifyUser(payload.userInfo.email);
      const tokenStored = await this.cache.get(userInfo.id.toString());
      if (tokenStored === refreshToken) {
        const accessToken = await this.generateToken(
          userInfo,
          authConstants.jwt.expirationTime.accessToken
        );

        return {
          statusCode: HttpStatus.OK,
          data: accessToken,
        };
      }
      throw new BadRequestException('Please login again');
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}

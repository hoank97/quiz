import { Injectable } from '@nestjs/common';
import { MyLogger } from 'src/modules/v1/logging/logger.service';
import { CreateUserDto } from './dto/create-user.dto';
import { IUser } from './interfaces';
import UserRepository from './users.repository';
import { ADMIN_EMAIL, ROLE } from 'src/commons/constants/variables.constants';

@Injectable()
export class UsersService {
  constructor(
    private myLogger: MyLogger,
    private readonly userRepo: UserRepository
  ) {
    this.myLogger.setContext(UsersService.name);
  }

  async create(data: CreateUserDto) {
    let role = ROLE.USER;
    if (ADMIN_EMAIL.includes(data.email)) role = ROLE.ADMIN;

    return this.userRepo.create(data, role);
  }

  // async findAll() {
  //   this.myLogger.log('This action returns all users');
  //   return `This action returns all users`;
  // }

  // async findOne(id: number): Promise<IUser | undefined> {
  //   return this.userRepo.findOneByCondition(id);
  // }

  // async remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }

  async findByEmail(email: string) {
    return this.userRepo.getByEmail(email);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { IUser } from './interfaces';

@Injectable()
export default class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>
  ) {
    // super(userEntity);
  }

  async getByEmail(email: string): Promise<IUser|undefined> {
    return this.userEntity.findOne({ where: { email } });
  }

  async create(data: CreateUserDto, role: number): Promise<IUser> {
    const body = {
      ...data,
      role,
      is_active: true,
    };
    return this.userEntity.save(body);
  }

  // async findOneByCondition(id: number) {
  //   return this.userEntity.findOne({ where: { id } });
  // }
}

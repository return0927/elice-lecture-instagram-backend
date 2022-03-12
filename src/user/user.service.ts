import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getById(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ id });
    if (!user) throw new NotFoundException(`Cannot find user with id ${id}`);

    return user;
  }
}

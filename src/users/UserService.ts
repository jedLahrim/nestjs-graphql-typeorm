import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../graphql/models/User';
import { CreateUserInput } from '../graphql/utils/CreateUserInput';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {
  }

  getUsers() {
    return this.usersRepository.find({ relations: { settings: true } });
  }

  async getUserById(id?: string) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: { settings: true },
    });
    if (!user) throw new NotFoundException({ message: 'NOT_FOUND_USER' });
    return user;
  }

  createUser(createUserData: CreateUserInput) {
    const newUser = this.usersRepository.create(createUserData);
    return this.usersRepository.save(newUser);
  }
}

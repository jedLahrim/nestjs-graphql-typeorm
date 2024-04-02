import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePetInput } from './dto/create-pet.input';
import { UpdatePetInput } from './dto/update-pet.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pet } from './entities/pet.entity';
import { User } from '../graphql/models/User';
import { FilterPetInput } from './dto/filter-pet.input';

@Injectable()
export class PetsService {

  constructor(
    @InjectRepository(Pet) private petRepo: Repository<Pet>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {
  }

  async create(createPetInput: CreatePetInput) {
    const { name, description, userId } = createPetInput;
    // check if user exist
    const findUser = await this.userRepo.findOneBy({
      id: userId,
    });

    if (!findUser) throw new NotFoundException('User Not Found');
    const pet = this.petRepo.create({ name, description, user: { id: userId } });
    return this.petRepo.save(pet);
  }

  async findAll(filterInput: FilterPetInput) {
    const { take, skip, userId } = filterInput;
    const query = this.petRepo.createQueryBuilder('pet');
    if (userId) query.andWhere('pet.userId= :userId', { userId: userId });
    query.take(take);
    query.skip(skip);
    const [data, total] = await query.getManyAndCount();
    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} pet`;
  }

  update(id: number, updatePetInput: UpdatePetInput) {
    return `This action updates a #${id} pet`;
  }

  remove(id: number) {
    return `This action removes a #${id} pet`;
  }
}

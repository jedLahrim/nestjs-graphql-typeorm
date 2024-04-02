import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsResolver } from './pets.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './entities/pet.entity';
import { User } from '../graphql/models/User';

@Module({
  imports: [TypeOrmModule.forFeature([Pet, User])],
  providers: [PetsResolver, PetsService],
})
export class PetsModule {
}

import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserSetting } from './UserSetting';
import { Pet } from '../../pets/entities/pet.entity';

@Entity({ name: 'users' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
    // @Field(() => String)
  id: string;

  @Column()
  @Field()
  username: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  displayName?: string;

  @OneToOne(() => UserSetting)
  @JoinColumn()
  @Field({ nullable: true })
  settings?: UserSetting;

  @OneToMany(type => Pet, pet => pet.user)
  pets: Pet[];
}

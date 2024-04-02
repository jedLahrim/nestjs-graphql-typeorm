import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../graphql/models/User';

@Entity({ name: 'pet' })
@ObjectType()
export class Pet {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column()
  description: string;

  @ManyToOne(type => User, user => user.pets, { onDelete: 'CASCADE' })
  user: User;

  @Field(() => String)
  @Column({ nullable: true })
  userId: string;
}

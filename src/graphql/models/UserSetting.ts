import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity({ name: 'user_settings' })
@ObjectType()
export class UserSetting {
  @PrimaryGeneratedColumn('uuid')
    // @Field(() => String)
  id: string;
  @Column()
  @Field((type) => String)
  userId: string;

  @Column({ default: false })
  @Field({ defaultValue: false })
  receiveNotifications: boolean;

  @Column({ default: false })
  @Field({ defaultValue: false })
  receiveEmails: boolean;
}

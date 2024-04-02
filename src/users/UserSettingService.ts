import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../graphql/models/User';
import { UserSetting } from '../graphql/models/UserSetting';
import { CreateUserSettingsInput } from '../graphql/utils/CreateUserSettingsInput';
import { Repository } from 'typeorm';

@Injectable()
export class UserSettingService {
  constructor(
    @InjectRepository(UserSetting)
    private userSettingsRepository: Repository<UserSetting>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
  }

  getUserSettingById(userId: string) {
    return this.userSettingsRepository.findOneBy({ userId: userId });
  }

  async createUserSettings(createUserSettingsData: CreateUserSettingsInput) {
    const findUser = await this.userRepository.findOneBy({
      id: createUserSettingsData.userId,
    });

    if (!findUser) throw new NotFoundException('User Not Found');

    const newUserSetting = this.userSettingsRepository.create(
      createUserSettingsData,
    );
    const savedSettings =
      await this.userSettingsRepository.save(newUserSetting);

    findUser.settings = savedSettings;
    await this.userRepository.save(findUser);

    return savedSettings;
  }
}

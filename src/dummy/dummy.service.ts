import { Inject, Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { Response } from 'express';
import { User } from 'src/auth/users/entities/user.entity';
@Injectable()
export class DummyService {
  constructor(
    @Inject('USERS_REPOSITORY') private userRepository: typeof User,
  ) {}

  async addDummyUser(res: Response) {
    const users = [];
    for (let i = 0; i < 10; i++) {
      const user = {
        email: faker.internet.email(),
        fullName: faker.person.fullName(),
        userName: faker.internet.userName(),
        otpCode: faker.string.numeric(),
        isActive: true,
        profilePictureUrl: `https://picsum.photos/500/500?random=${i}`,
        bio: faker.lorem.sentence(),
        gender: faker.person.gender(),
        password: faker.internet.password(),
      };
      users.push(user);
    }
    try {
      const createdUsers = await this.userRepository.bulkCreate(users);
      res.status(201).json(createdUsers);
    } catch (err) {
      res.status(500).json({ message: 'internal server error' });
    }
  }
}

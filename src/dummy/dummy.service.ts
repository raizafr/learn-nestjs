import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { PrismaService } from 'src/prisma.service';
import { Response } from 'express';
@Injectable()
export class DummyService {
  constructor(private prismaService: PrismaService) {}

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
      const createdUsers = await Promise.all(
        users.map((user) => this.prismaService.user.create({ data: user })),
      );
      res.status(201).json(createdUsers);
    } catch (err) {
      res.status(500).json({ message: 'internal server error' });
    }
  }
}

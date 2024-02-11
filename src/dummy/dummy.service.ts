import { Inject, Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { Response } from 'express';
import { User } from 'src/auth/users/entities/user.entity';
import { Follower } from 'src/follower/entities/follower.entity';
import { Followed } from 'src/followed/entities/followed.entity';
@Injectable()
export class DummyService {
  constructor(
    @Inject('USERS_REPOSITORY') private userRepository: typeof User,
    @Inject('FOLLOWERS_REPOSITORY') private followerRepository: typeof Follower,
    @Inject('FOLLOWEDS_REPOSITORY') private followedRepository: typeof Followed,
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

  async createRandFollower(res: Response) {
    try {
      const users = await this.userRepository.findAll({
        attributes: {
          exclude: [
            'password',
            'otpCode',
            'isActive',
            'email',
            'fullName',
            'userName',
            'profilePictureUrl',
            'bio',
            'gender',
            'createdAt',
            'updatedAt',
          ],
        },
      });
      // eslint-disable-next-line prefer-const
      let allUserIdExist = [];
      allUserIdExist.push(...users.map((user: any) => user.id));
      const randomUser = Math.floor(Math.random() * allUserIdExist.length);
      const randomUserId = allUserIdExist[randomUser];
      const remainingArray = allUserIdExist.filter(
        (_, index) => index !== randomUser,
      );
      const randomUser2 = Math.floor(Math.random() * remainingArray.length);
      const randomUser2Id = remainingArray[randomUser2];
      const findExistFollowed = await this.followedRepository.findOne({
        where: { userId: randomUserId, followedId: randomUser2Id },
      });
      if (findExistFollowed) {
        return res.json({ message: 'data exist' });
      }
      const storeFollowed = await this.followedRepository.create({
        userId: randomUserId,
        followedId: randomUser2Id,
      });
      const storeFollower = await this.followerRepository.create({
        userId: randomUser2Id,
        followerId: randomUserId,
      });
      res.json({ storeFollowed, storeFollower });
    } catch (err) {
      res.status(500).json({ message: 'internal server error' });
    }
  }
}

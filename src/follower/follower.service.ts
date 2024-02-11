import { Inject, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { CreateFollowerDto } from './dto/create-follower.dto';
import { UsersService } from 'src/auth/users/users.service';
import { Follower } from './entities/follower.entity';
import { User } from 'src/auth/users/entities/user.entity';

@Injectable()
export class FollowerService {
  constructor(
    @Inject('FOLLOWERS_REPOSITORY') private followerRepository: typeof Follower,
    private userService: UsersService,
  ) {}
  async addFollower(createFollowerDto: CreateFollowerDto, res: Response) {
    const { userId, followerId } = createFollowerDto;

    try {
      if (userId === followerId) {
        return res
          .status(409)
          .json({ message: 'userId and followerId cannot be the same' });
      }

      const userIdNumber =
        typeof userId === 'string' ? parseInt(userId) : userId;
      const followerIdNumber =
        typeof followerId === 'string' ? parseInt(followerId) : followerId;

      const findUserId = await this.userService.findById(userIdNumber);
      if (!findUserId) {
        return res
          .status(404)
          .json({ message: `user with id ${userId} does not exist` });
      }

      const findFollowerId = await this.userService.findById(followerIdNumber);
      if (!findFollowerId) {
        return res
          .status(404)
          .json({ message: `user with id ${followerId} does not exist` });
      }

      const existFollower = await this.followerRepository.findOne({
        where: { userId: userIdNumber, followerId: followerIdNumber },
      });
      if (existFollower) {
        return res.status(409).json({ message: 'failed to add, data exists' });
      }

      const add = await this.followerRepository.create({
        userId,
        followerId,
      });
      return res.status(201).json({ message: 'follower added', add });
    } catch (err) {
      return res.status(500).json({ message: 'internal server error' });
    }
  }

  async removeFollower(createFollowerDto: CreateFollowerDto, res: Response) {
    const { userId, followerId } = createFollowerDto;

    try {
      if (userId === followerId) {
        return res
          .status(409)
          .json({ message: 'userId and followerId cannot be the same' });
      }

      const userIdNumber =
        typeof userId === 'string' ? parseInt(userId) : userId;
      const followerIdNumber =
        typeof followerId === 'string' ? parseInt(followerId) : followerId;

      const findUserId = await this.userService.findById(userIdNumber);
      if (!findUserId) {
        return res
          .status(404)
          .json({ message: `user with id ${userId} does not exist` });
      }

      const findFollowerId = await this.userService.findById(followerIdNumber);
      if (!findFollowerId) {
        return res
          .status(404)
          .json({ message: `user with id ${followerId} does not exist` });
      }

      const existFollower = await this.followerRepository.findOne({
        where: { userId: userIdNumber, followerId: followerIdNumber },
      });
      if (!existFollower) {
        return res
          .status(404)
          .json({ message: 'failed to delete, data is missing' });
      }
      await existFollower.destroy();
      return res.status(200).json({ message: 'delete success' });
    } catch (err) {
      return res.status(500).json({ message: 'internal server error' });
    }
  }

  async getAllFollowedById(id: number, res: Response) {
    try {
      const findsFollower = await this.followerRepository.findAll({
        where: { userId: id },
        include: [
          {
            model: User,
            as: 'followerUser',
            attributes: [
              'id',
              'email',
              'fullName',
              'userName',
              'profilePictureUrl',
              'createdAt',
              'updatedAt',
            ],
          },
        ],
      });

      return res
        .status(200)
        .json({ message: 'foollowed get', data: findsFollower });
    } catch (err) {
      return res.status(500).json({ message: 'internal server error' });
    }
  }
}

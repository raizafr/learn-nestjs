import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { PrismaService } from 'src/prisma.service';
import { CreateFollowerDto } from './dto/create-follower.dto';
import { UsersService } from 'src/auth/users/users.service';

@Injectable()
export class FollowerService {
  constructor(
    private prismaService: PrismaService,
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

      const existFollower = await this.prismaService.follower.findFirst({
        where: { userId: userIdNumber, followerId: followerIdNumber },
      });
      if (existFollower) {
        return res.status(409).json({ message: 'failed to add, data exists' });
      }

      const add = await this.prismaService.follower.create({
        data: {
          userId,
          followerId,
        },
      });
      return res.status(201).json({ message: 'follower added', add });
    } catch (err) {
      console.log(err);
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

      const existFollower = await this.prismaService.follower.findFirst({
        where: { userId: userIdNumber, followerId: followerIdNumber },
      });
      if (!existFollower) {
        return res
          .status(404)
          .json({ message: 'failed to delete, data is missing' });
      }
      await this.prismaService.follower.delete({
        where: existFollower,
      });
      return res.status(200).json({ message: 'delete success' });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'internal server error' });
    }
  }
}

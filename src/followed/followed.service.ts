import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/auth/users/users.service';
import { CreateFollowedDto } from './dto/create-followed.dto';

@Injectable()
export class FollowedService {
  constructor(
    public prismaService: PrismaService,
    public userService: UsersService,
  ) {}
  async addFollowed(createFollowedDto: CreateFollowedDto, res: Response) {
    const { userId, followedId } = createFollowedDto;

    try {
      if (userId === followedId) {
        return res
          .status(409)
          .json({ message: 'userId and followedId cannot be the same' });
      }

      const userIdNumber =
        typeof userId === 'string' ? parseInt(userId) : userId;
      const followedIdNumber =
        typeof followedId === 'string' ? parseInt(followedId) : followedId;

      const findUserId = await this.userService.findById(userIdNumber);
      if (!findUserId) {
        return res
          .status(404)
          .json({ message: `user with id ${userId} does not exist` });
      }

      const findFollowedId = await this.userService.findById(followedIdNumber);
      if (!findFollowedId) {
        return res
          .status(404)
          .json({ message: `user with id ${followedId} does not exist` });
      }

      const existFollowed = await this.prismaService.followed.findFirst({
        where: { userId: userIdNumber, followedId: followedIdNumber },
      });
      if (existFollowed) {
        return res.status(409).json({ message: 'failed to add, data exists' });
      }

      const add = await this.prismaService.followed.create({
        data: {
          userId,
          followedId,
        },
      });
      return res.status(201).json({ message: 'followed added', add });
    } catch (err) {
      res.status(500).json({ message: 'internal server error' });
    }
  }

  async removeFollowed(createFollowedDto: CreateFollowedDto, res: Response) {
    const { userId, followedId } = createFollowedDto;

    try {
      if (userId === followedId) {
        return res
          .status(409)
          .json({ message: 'userId and followedId cannot be the same' });
      }

      const userIdNumber =
        typeof userId === 'string' ? parseInt(userId) : userId;
      const followedIdNumber =
        typeof followedId === 'string' ? parseInt(followedId) : followedId;

      const findUserId = await this.userService.findById(userIdNumber);
      if (!findUserId) {
        return res
          .status(404)
          .json({ message: `user with id ${userId} does not exist` });
      }

      const findFollowedId = await this.userService.findById(followedIdNumber);
      if (!findFollowedId) {
        return res
          .status(404)
          .json({ message: `user with id ${followedId} does not exist` });
      }

      const existFollowed = await this.prismaService.followed.findFirst({
        where: { userId: userIdNumber, followedId: followedIdNumber },
      });
      if (!existFollowed) {
        return res
          .status(404)
          .json({ message: 'failed to delete, data is missing' });
      }

      await this.prismaService.followed.delete({
        where: existFollowed,
      });
      return res.status(200).json({ message: 'delete success' });
    } catch (err) {
      res.status(500).json({ message: 'internal server error' });
    }
  }
}
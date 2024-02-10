import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UsersService } from 'src/auth/users/users.service';
import { Response } from 'express';
import { DeletePostDto } from './dto/delete-post.dto';

@Injectable()
export class PostService {
  constructor(private userService: UsersService) {}
  async createNewPost(createPostDto: CreatePostDto, res: Response) {
    const { userId, content, caption } = createPostDto;
    try {
      const userIdNumber =
        typeof userId === 'string' ? parseInt(userId) : userId;

      const findUserId = await this.userService.findById(userIdNumber);
      if (!findUserId) {
        return res.status(404).json({ message: `${userId} not found` });
      }

      for (const cont of content) {
        if (!cont.name || !cont.path) {
          return res.status(400).json({
            message:
              'Invalid content. content must have name and path properties',
          });
        }
      }
      // const newPost = await this.prismaService.post.create({
      //   data: {
      //     userId: userIdNumber,
      //     caption,
      //     content: {
      //       create: content.map((item: { name: string; path: string }) => ({
      //         name: item.name,
      //         path: item.path,
      //       })),
      //     },
      //   },
      // });
      // return res.status(201).json({ message: 'created post', newPost });
    } catch (err) {
      return res.status(500).json({ message: 'internal server error' });
    }
  }

  async deletePost(deletePostDto: DeletePostDto, res: Response) {
    const { postId } = deletePostDto;
    try {
      // const findPost = await this.prismaService.post.findUnique({
      //   where: { id: postId },
      // });
      // if (!findPost) {
      //   return res.status(404).json({ message: `post id ${postId} not found` });
      // }
      // await this.prismaService.content.deleteMany({
      //   where: {
      //     postId,
      //   },
      // });
      // await this.prismaService.post.delete({
      //   where: {
      //     id: postId,
      //   },
      // });
      // return res
      //   .status(200)
      //   .json({ message: `post id ${postId} delete success` });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'internal server error' });
    }
  }
}

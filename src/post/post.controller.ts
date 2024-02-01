import { Controller, Post, Body, Res } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Response } from 'express';
import { DeletePostDto } from './dto/delete-post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('create')
  create(@Body() createPostDto: CreatePostDto, @Res() res: Response) {
    return this.postService.createNewPost(createPostDto, res);
  }
  @Post('delete')
  deletePost(@Body() deletePostDto: DeletePostDto, @Res() res: Response) {
    return this.postService.deletePost(deletePostDto, res);
  }
}

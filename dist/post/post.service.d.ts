import { CreatePostDto } from './dto/create-post.dto';
import { UsersService } from 'src/auth/users/users.service';
import { Response } from 'express';
import { PrismaService } from 'src/prisma.service';
import { DeletePostDto } from './dto/delete-post.dto';
export declare class PostService {
    private userService;
    private prismaService;
    constructor(userService: UsersService, prismaService: PrismaService);
    createNewPost(createPostDto: CreatePostDto, res: Response): Promise<Response<any, Record<string, any>>>;
    deletePost(deletePostDto: DeletePostDto, res: Response): Promise<Response<any, Record<string, any>>>;
}

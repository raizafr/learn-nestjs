import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Response } from 'express';
import { DeletePostDto } from './dto/delete-post.dto';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    create(createPostDto: CreatePostDto, res: Response): Promise<Response<any, Record<string, any>>>;
    deletePost(deletePostDto: DeletePostDto, res: Response): Promise<Response<any, Record<string, any>>>;
}

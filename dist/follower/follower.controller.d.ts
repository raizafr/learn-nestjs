import { FollowerService } from './follower.service';
import { Response } from 'express';
import { CreateFollowerDto } from './dto/create-follower.dto';
export declare class FollowerController {
    private readonly followerService;
    constructor(followerService: FollowerService);
    addFollower(createFollowerDto: CreateFollowerDto, res: Response): Promise<Response<any, Record<string, any>>>;
    removeFollower(createFollowerDto: CreateFollowerDto, res: Response): Promise<Response<any, Record<string, any>>>;
}

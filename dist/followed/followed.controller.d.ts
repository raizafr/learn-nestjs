import { FollowedService } from './followed.service';
import { CreateFollowedDto } from './dto/create-followed.dto';
import { Response } from 'express';
export declare class FollowedController {
    private readonly followedService;
    constructor(followedService: FollowedService);
    addFollowed(createFollowedDto: CreateFollowedDto, res: Response): Promise<Response<any, Record<string, any>>>;
    removeFollowed(createFollowedDto: CreateFollowedDto, res: Response): Promise<Response<any, Record<string, any>>>;
}

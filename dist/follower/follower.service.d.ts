import { Response } from 'express';
import { PrismaService } from 'src/prisma.service';
import { CreateFollowerDto } from './dto/create-follower.dto';
import { UsersService } from 'src/auth/users/users.service';
export declare class FollowerService {
    private prismaService;
    private userService;
    constructor(prismaService: PrismaService, userService: UsersService);
    addFollower(createFollowerDto: CreateFollowerDto, res: Response): Promise<Response<any, Record<string, any>>>;
    removeFollower(createFollowerDto: CreateFollowerDto, res: Response): Promise<Response<any, Record<string, any>>>;
}

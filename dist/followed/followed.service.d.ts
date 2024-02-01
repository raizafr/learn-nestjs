import { Response } from 'express';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/auth/users/users.service';
import { CreateFollowedDto } from './dto/create-followed.dto';
export declare class FollowedService {
    prismaService: PrismaService;
    userService: UsersService;
    constructor(prismaService: PrismaService, userService: UsersService);
    addFollowed(createFollowedDto: CreateFollowedDto, res: Response): Promise<Response<any, Record<string, any>>>;
    removeFollowed(createFollowedDto: CreateFollowedDto, res: Response): Promise<Response<any, Record<string, any>>>;
}

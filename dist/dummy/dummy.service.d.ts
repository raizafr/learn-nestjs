import { PrismaService } from 'src/prisma.service';
import { Response } from 'express';
export declare class DummyService {
    private prismaService;
    constructor(prismaService: PrismaService);
    addDummyUser(res: Response): Promise<void>;
}

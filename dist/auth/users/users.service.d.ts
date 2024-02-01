import { RegisterUserDto } from './dto/register-user.dto';
import { PrismaService } from 'src/prisma.service';
import { NodemailerService } from 'src/nodemailer/nodemailer.service';
import { MailTemplate } from 'src/utils/MailTemplate';
import { UpdateProfilDto } from './dto/updateProfil-user.dto';
import { Response } from 'express';
export declare class UsersService {
    private prisma;
    private readonly nodemailerService;
    private readonly mailTemplate;
    constructor(prisma: PrismaService, nodemailerService: NodemailerService, mailTemplate: MailTemplate);
    create(registerUserDto: RegisterUserDto, res: Response): Promise<any>;
    findOne(email: string): Promise<any>;
    findByUsername(userName: string): Promise<any>;
    findById(userId: number): Promise<any>;
    updateProfil(updateProfilDto: UpdateProfilDto, res: Response): Promise<Response<any, Record<string, any>>>;
}

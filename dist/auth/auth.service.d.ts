import { UsersService } from './users/users.service';
import { LoginUserDto } from './users/dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { ResendEmailAuthDto } from './dto/resendemail-auth.dto';
import { PrismaService } from 'src/prisma.service';
import { NodemailerService } from 'src/nodemailer/nodemailer.service';
import { MailTemplate } from 'src/utils/MailTemplate';
import { VerificationOtpAuthDto } from './dto/verification-auth.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    private prisma;
    private readonly nodemailerService;
    private readonly mailTemplate;
    constructor(usersService: UsersService, jwtService: JwtService, prisma: PrismaService, nodemailerService: NodemailerService, mailTemplate: MailTemplate);
    validateUser(loginUserDto: LoginUserDto, res: Response): Promise<Response<any, Record<string, any>>>;
    login(loginUserDto: LoginUserDto, res: Response): Promise<Response<any, Record<string, any>>>;
    getUserFromToken(token: string, res: Response): Promise<any>;
    logout(req: Request, res: Response): Response<any, Record<string, any>>;
    resendOtpCode(resendEmailAuthDto: ResendEmailAuthDto, res: Response): Promise<Response<any, Record<string, any>>>;
    verifyOtp(verificationOtpAuthDto: VerificationOtpAuthDto, res: Response): Promise<Response<any, Record<string, any>>>;
}

import { UsersService } from './users/users.service';
import { RegisterUserDto } from './users/dto/register-user.dto';
import { LoginUserDto } from './users/dto/login-user.dto';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { ResendEmailAuthDto } from './dto/resendemail-auth.dto';
import { VerificationOtpAuthDto } from './dto/verification-auth.dto';
export declare class AuthController {
    private usersService;
    private authService;
    constructor(usersService: UsersService, authService: AuthService);
    register(registerUserdto: RegisterUserDto, res: Response): Promise<any>;
    login(loginUserDto: LoginUserDto, res: Response): Promise<Response<any, Record<string, any>>>;
    me(req: Request, res: Response): Promise<any>;
    logout(req: Request, res: Response): Response<any, Record<string, any>>;
    resendOtp(resendEmailAuthDto: ResendEmailAuthDto, res: Response): Promise<Response<any, Record<string, any>>>;
    verifyOtp(verificationAuthDto: VerificationOtpAuthDto, res: Response): Promise<Response<any, Record<string, any>>>;
}

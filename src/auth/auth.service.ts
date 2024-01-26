import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users/users.service';
import { LoginUserDto } from './users/dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { ResendEmailAuthDto } from './dto/resendemail-auth.dto';
import { PrismaService } from 'src/prisma.service';
import * as speakeasy from 'speakeasy';
import { NodemailerService } from 'src/nodemailer/nodemailer.service';
import { MailTemplate } from 'src/utils/MailTemplate';
import { VerificationOtpAuthDto } from './dto/verification-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService,
    private readonly nodemailerService: NodemailerService,
    private readonly mailTemplate: MailTemplate,
  ) {}

  async validateUser(loginUserDto: LoginUserDto, res: Response) {
    const user = await this.usersService.findOne(loginUserDto.email);
    if (!user) {
      res.status(404);
      throw new NotFoundException(`${loginUserDto.email} not found`);
    }
    if (!user.isActive) {
      res.status(401);
      throw new UnauthorizedException(`${user.email} not yet verified`);
    }
    const isMatch = await bcrypt.compare(loginUserDto.password, user.password);
    if (!isMatch) {
      res.status(401);
      throw new UnauthorizedException('wrong password');
    }
    res.status(200);
    res.cookie('access_token', this.jwtService.sign(loginUserDto), {
      httpOnly: true,
    });
    return { access_token: this.jwtService.sign(loginUserDto) };
  }

  async login(loginUserDto: LoginUserDto, res: Response) {
    try {
      const response = await this.validateUser(loginUserDto, res);
      return response;
    } catch (err) {
      return err;
    }
  }

  async getUserFromToken(token: string, res: Response) {
    try {
      const { email } = this.jwtService.verify(token);
      const dataUser = await this.usersService.findOne(email);
      if (!dataUser.isActive) {
        res.status(401);
        throw new UnauthorizedException(`${email} not yet verified`);
      }
      delete dataUser.password;
      delete dataUser.otpCode;
      return res.status(200).json({ dataUser });
    } catch (err) {
      return err;
    }
  }

  logout(req: Request, res: Response) {
    res.clearCookie('access_token');
    return res.status(200).json({ message: 'Logout berhasil' });
  }

  async resendOtpCode(resendEmailAuthDto: ResendEmailAuthDto, res: Response) {
    try {
      const { email } = resendEmailAuthDto;
      const user = await this.usersService.findOne(email);
      if (!user) {
        return res.status(404).json({ message: `${email} not found` });
      }
      const secreat = speakeasy.generateSecret();

      const otp = speakeasy.totp({
        encoding: 'base32',
        secret: secreat.base32,
      });

      await this.prisma.user.update({
        where: { email },
        data: { otpCode: otp },
      });

      await this.nodemailerService.sendMail({
        from: process.env.MAIL_USER,
        to: email,
        subject: 'OTP CODE',
        html: this.mailTemplate.verificationTemplate(user.userName, otp),
      });

      return res.status(200).json({ message: `resend email to ${email}` });
    } catch (err) {
      throw err;
    }
  }

  async verifyOtp(
    verificationOtpAuthDto: VerificationOtpAuthDto,
    res: Response,
  ) {
    try {
      const { email, otpCode } = verificationOtpAuthDto;
      const user = await this.usersService.findOne(email);
      if (!user) {
        return res.status(404);
        throw new NotFoundException(`${email} not found`);
      }
      if (otpCode === user.otpCode) {
        await this.prisma.user.update({
          where: { email },
          data: { isActive: true },
        });
        return res.status(200).json({ message: 'verification success' });
      }
      return res.status(401).json({ message: 'verification failed' });
    } catch (err) {
      throw err;
    }
  }
}

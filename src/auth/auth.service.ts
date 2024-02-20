import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { LoginUserDto } from './users/dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { ResendEmailAuthDto } from './dto/resendemail-auth.dto';
import * as speakeasy from 'speakeasy';
import { NodemailerService } from 'src/nodemailer/nodemailer.service';
import { MailTemplate } from 'src/utils/MailTemplate';
import { VerificationOtpAuthDto } from './dto/verification-auth.dto';
import { User } from './users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USERS_REPOSITORY') private usersRepository: typeof User,
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly nodemailerService: NodemailerService,
    private readonly mailTemplate: MailTemplate,
  ) {}

  async validateUser(loginUserDto: LoginUserDto, res: Response) {
    try {
      const user = await this.usersService.findOne(loginUserDto.email);
      if (!user) {
        res.status(404).json({ message: `${loginUserDto.email} not found` });
      }
      if (!user.isActive) {
        res.status(401).json({ message: `${user.email} not yet verified` });
      }
      const isMatch = await bcrypt.compare(
        loginUserDto.password,
        user.password,
      );
      if (!isMatch) {
        res.status(401).json({ message: 'wrong password' });
      }
      return res.status(200).json({
        message: 'login success',
        access_token: this.jwtService.sign({ email: loginUserDto.email }),
      });
    } catch (err) {
      throw err;
    }
  }

  async login(loginUserDto: LoginUserDto, res: Response) {
    try {
      const response = await this.validateUser(loginUserDto, res);
      return response;
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: 'server error' });
    }
  }

  async getUserFromToken(token: string, res: Response) {
    try {
      const { email } = this.jwtService.verify(token);
      const dataUser = await this.usersRepository.findOne({
        where: { email },
        include: {
          all: true,
          attributes: { exclude: ['password', 'otpCode', 'isActive'] },
        },
        attributes: { exclude: ['password', 'otpCode'] },
      });
      if (!dataUser.isActive) {
        return res.status(401).json({ message: `${email} not yet verified` });
      }
      return res.status(200).json({ dataUser });
    } catch (err) {
      return res.status(500).json({ message: 'internal server error' });
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

      await user.update({ otpCode: otp });
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
        return res.status(404).json(`${email} not found`);
      }
      if (otpCode === user.otpCode) {
        await user.update({ isActive: true });
        return res.status(200).json({ message: 'verification success' });
      }
      return res.status(401).json({ message: 'verification failed' });
    } catch (err) {
      return res.status(500).json({ message: 'internal server error' });
    }
  }
}

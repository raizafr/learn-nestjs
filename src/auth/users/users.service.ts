import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import * as speakeasy from 'speakeasy';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';
import { NodemailerService } from 'src/nodemailer/nodemailer.service';
import { MailTemplate } from 'src/utils/MailTemplate';
import { UpdateProfilDto } from './dto/updateProfil-user.dto';
import { Response } from 'express';
@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private readonly nodemailerService: NodemailerService,
    private readonly mailTemplate: MailTemplate,
  ) {}

  async create(registerUserDto: RegisterUserDto, res: Response) {
    try {
      const { email, password, userName, fullName } = registerUserDto;
      const findUserByEmail = await this.findOne(email);
      if (findUserByEmail) {
        return res.status(409).json({ message: `${email} already exist` });
      }
      const findUserByUsername = await this.findByUsername(userName);
      if (findUserByUsername) {
        return res.status(409).json({ message: `${userName} already exist` });
      }
      const saltOrRounds = 10;
      const hash = await bcrypt.hash(password, saltOrRounds);
      const secreat = speakeasy.generateSecret();
      const otp = speakeasy.totp({
        encoding: 'base32',
        secret: secreat.base32,
      });
      const createUser = await this.prisma.user.create({
        data: {
          email,
          fullName,
          userName,
          otpCode: otp,
          isActive: false,
          password: hash,
        },
      });

      await this.nodemailerService.sendMail({
        from: process.env.MAIL_USER,
        to: email,
        subject: 'OTP CODE',
        html: this.mailTemplate.verificationTemplate(userName, otp),
      });

      delete createUser.password;
      return res
        .status(201)
        .json({ message: `OTP code has been sent to ${email}`, createUser });
    } catch (err) {
      return err;
    }
  }

  async findOne(email: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: email },
      });
      if (!user) return null;
      return user;
    } catch (err) {
      return err;
    }
  }

  async findByUsername(userName: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { userName: userName },
      });
      if (!user) return null;
      return user;
    } catch (err) {
      return err;
    }
  }

  async findById(userId: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });
      if (!user) return null;
      return user;
    } catch (err) {
      return err;
    }
  }

  async updateProfil(updateProfilDto: UpdateProfilDto, res: Response) {
    try {
      const { userId, fullName, userName, profilePictureUrl, bio, gender } =
        updateProfilDto;
      const findUserById = await this.findById(userId);
      if (!findUserById) {
        return res.status(404).json({ message: `user id ${userId} not found` });
      }
      const updateUser = await this.prisma.user.update({
        where: { id: userId },
        data: {
          fullName: fullName,
          userName: userName,
          profilePictureUrl: profilePictureUrl,
          bio: bio,
          gender: gender,
          updatedAt: new Date(),
        },
      });
      delete updateUser.otpCode;
      delete updateUser.isActive;
      delete updateUser.password;
      return res.status(201).json({ message: 'update success', updateUser });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'internal server error' });
    }
  }

  async findManyUserByUsername(userName: string, res: Response) {
    try {
      const finds = await this.prisma.user.findMany({
        where: { userName: { contains: userName } },
      });
      if (finds.length < 1) {
        return res.status(200).json({ message: 'user not found', data: null });
      }
      const filter = finds.map((user) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, otpCode, isActive, ...rest } = user;
        return rest;
      });
      res.status(200).json({ message: 'get data successfully', data: filter });
    } catch (err) {
      res.status(500).json({ message: 'internal server error' });
    }
  }
}

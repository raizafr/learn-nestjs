import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import * as speakeasy from 'speakeasy';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(registerUserDto: RegisterUserDto) {
    try {
      const { email, password, userName, fullName } = registerUserDto;
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
      delete createUser.password;
      return createUser;
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
}

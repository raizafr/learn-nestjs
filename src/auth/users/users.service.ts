import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import * as speakeasy from 'speakeasy';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';
import { NodemailerService } from 'src/nodemailer/nodemailer.service';
import { MailTemplate } from 'src/utils/MailTemplate';
import { UpdateProfilDto } from './dto/updateProfil-user.dto';
@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private readonly nodemailerService: NodemailerService,
    private readonly mailTemplate: MailTemplate,
  ) {}

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

      await this.nodemailerService.sendMail({
        from: process.env.MAIL_USER,
        to: email,
        subject: 'OTP CODE',
        html: this.mailTemplate.verificationTemplate(userName, otp),
      });

      delete createUser.password;
      return { message: `OTP code has been sent to ${email}`, createUser };
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

  async updateProfil(
    userId: string,
    updateProfilDto: UpdateProfilDto,
    res: Response,
  ) {}
}

import { Module } from '@nestjs/common';
import { FollowerService } from './follower.service';
import { FollowerController } from './follower.controller';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/auth/users/users.service';
import { NodemailerService } from 'src/nodemailer/nodemailer.service';
import { MailTemplate } from 'src/utils/MailTemplate';

@Module({
  controllers: [FollowerController],
  providers: [
    FollowerService,
    PrismaService,
    UsersService,
    NodemailerService,
    MailTemplate,
  ],
})
export class FollowerModule {}

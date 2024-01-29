import { Module } from '@nestjs/common';
import { FollowedService } from './followed.service';
import { FollowedController } from './followed.controller';
import { PrismaService } from 'src/prisma.service';
import { UsersService } from 'src/auth/users/users.service';
import { NodemailerService } from 'src/nodemailer/nodemailer.service';
import { MailTemplate } from 'src/utils/MailTemplate';

@Module({
  controllers: [FollowedController],
  providers: [
    FollowedService,
    PrismaService,
    UsersService,
    NodemailerService,
    MailTemplate,
  ],
})
export class FollowedModule {}

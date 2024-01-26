import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma.service';
import { UsersController } from './users.controller';
import { NodemailerModule } from 'src/nodemailer/nodemailer.module';
import { NodemailerService } from 'src/nodemailer/nodemailer.service';
import { MailTemplate } from 'src/utils/MailTemplate';

@Module({
  imports: [NodemailerModule],
  controllers: [UsersController],
  providers: [UsersService, PrismaService, NodemailerService, MailTemplate],
})
export class UsersModule {}

import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { UsersService } from 'src/auth/users/users.service';
import { PrismaService } from 'src/prisma.service';
import { NodemailerService } from 'src/nodemailer/nodemailer.service';
import { MailTemplate } from 'src/utils/MailTemplate';

@Module({
  controllers: [PostController],
  providers: [
    PostService,
    UsersService,
    PrismaService,
    NodemailerService,
    MailTemplate,
  ],
})
export class PostModule {}

import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { UsersService } from 'src/auth/users/users.service';
import { NodemailerService } from 'src/nodemailer/nodemailer.service';
import { MailTemplate } from 'src/utils/MailTemplate';
import { usersProviders } from 'src/auth/users/users.provider';

@Module({
  controllers: [PostController],
  providers: [
    PostService,
    UsersService,
    NodemailerService,
    MailTemplate,
    ...usersProviders,
  ],
})
export class PostModule {}

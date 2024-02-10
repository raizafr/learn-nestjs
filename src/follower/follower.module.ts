import { Module } from '@nestjs/common';
import { FollowerService } from './follower.service';
import { FollowerController } from './follower.controller';
import { UsersService } from 'src/auth/users/users.service';
import { NodemailerService } from 'src/nodemailer/nodemailer.service';
import { MailTemplate } from 'src/utils/MailTemplate';
import { usersProviders } from 'src/auth/users/users.provider';
import { followersProviders } from './follower.provider';

@Module({
  controllers: [FollowerController],
  providers: [
    FollowerService,
    UsersService,
    NodemailerService,
    MailTemplate,
    ...usersProviders,
    ...followersProviders,
  ],
})
export class FollowerModule {}

import { Module } from '@nestjs/common';
import { FollowedService } from './followed.service';
import { FollowedController } from './followed.controller';
import { UsersService } from 'src/auth/users/users.service';
import { NodemailerService } from 'src/nodemailer/nodemailer.service';
import { MailTemplate } from 'src/utils/MailTemplate';
import { usersProviders } from 'src/auth/users/users.provider';
import { followedsProviders } from './followed.provider';

@Module({
  controllers: [FollowedController],
  providers: [
    FollowedService,
    UsersService,
    NodemailerService,
    MailTemplate,
    ...usersProviders,
    ...followedsProviders,
  ],
})
export class FollowedModule {}

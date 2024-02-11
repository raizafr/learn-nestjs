import { Module } from '@nestjs/common';
import { DummyService } from './dummy.service';
import { DummyController } from './dummy.controller';
import { usersProviders } from 'src/auth/users/users.provider';
import { followedsProviders } from 'src/followed/followed.provider';
import { followersProviders } from 'src/follower/follower.provider';

@Module({
  controllers: [DummyController],
  providers: [
    DummyService,
    ...usersProviders,
    ...followedsProviders,
    ...followersProviders,
  ],
})
export class DummyModule {}

import { Module } from '@nestjs/common';
import { DummyService } from './dummy.service';
import { DummyController } from './dummy.controller';
import { usersProviders } from 'src/auth/users/users.provider';

@Module({
  controllers: [DummyController],
  providers: [DummyService, ...usersProviders],
})
export class DummyModule {}

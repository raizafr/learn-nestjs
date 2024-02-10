import { Module } from '@nestjs/common';
import { DummyService } from './dummy.service';
import { DummyController } from './dummy.controller';
import { PrismaService } from 'src/prisma.service';
import { usersProviders } from 'src/auth/users/users.provider';

@Module({
  controllers: [DummyController],
  providers: [DummyService, PrismaService, ...usersProviders],
})
export class DummyModule {}

import { Module } from '@nestjs/common';
import { DummyService } from './dummy.service';
import { DummyController } from './dummy.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [DummyController],
  providers: [DummyService, PrismaService],
})
export class DummyModule {}

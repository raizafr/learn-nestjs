import { Module } from '@nestjs/common';
import { NodemailerService } from './nodemailer.service';

@Module({
  controllers: [],
  providers: [NodemailerService],
})
export class NodemailerModule {}

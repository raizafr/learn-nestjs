import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [AuthModule, UploadModule],
})
export class AppModule {}

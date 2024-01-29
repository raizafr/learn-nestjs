import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';
import { FollowerModule } from './follower/follower.module';
import { FollowedModule } from './followed/followed.module';
import { DummyModule } from './dummy/dummy.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [AuthModule, UploadModule, FollowerModule, FollowedModule, DummyModule],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';
import { FollowerModule } from './follower/follower.module';
import { FollowedModule } from './followed/followed.module';
import { DummyModule } from './dummy/dummy.module';
import { PostModule } from './post/post.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './auth/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UploadModule,
    UsersModule,
    FollowerModule,
    FollowedModule,
    DummyModule,
    PostModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

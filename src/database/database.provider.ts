import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/auth/users/entities/user.entity';
import { Followed } from 'src/followed/entities/followed.entity';
import { Follower } from 'src/follower/entities/follower.entity';
import { Content, Post } from 'src/post/entities/post.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'aws-0-ap-southeast-1.pooler.supabase.com',
        port: 5432,
        username: 'postgres.zohhioqbthsdlkhbrmsg',
        password: 'Dvk9avG97COa8auj',
        database: 'postgres',
      });
      sequelize.addModels([User, Followed, Follower, Post, Content]);
      await sequelize.sync();
      console.log('connect to database');
      return sequelize;
    },
  },
];

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
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });
      sequelize.addModels([User, Followed, Follower, Post, Content]);
      await sequelize.sync();
      console.log('connect to database');
      return sequelize;
    },
  },
];

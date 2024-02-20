import {
  Column,
  DataType,
  Model,
  Table,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { Followed } from 'src/followed/entities/followed.entity';
import { Follower } from 'src/follower/entities/follower.entity';
import { Post } from 'src/post/entities/post.entity';

@Table
export class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    unique: { name: 'User_email_key', msg: 'Email already exists' },
  })
  email: string;

  @Column({
    type: DataType.STRING,
  })
  fullName: string;

  @Column({
    type: DataType.STRING,
    unique: { name: 'User_userName_key', msg: 'Username already exists' },
  })
  userName: string;

  @Column({
    type: DataType.STRING,
  })
  otpCode: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isActive: boolean;

  @Column({
    type: DataType.STRING,
  })
  profilePictureUrl: string;

  @Column({
    type: DataType.STRING,
  })
  bio: string;

  @Column({
    type: DataType.STRING,
  })
  gender: string;

  @Column({
    type: DataType.STRING,
  })
  webUrl: string;

  @Column({
    type: DataType.STRING,
  })
  password: string;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
  })
  updatedAt: Date;

  @HasMany(() => Post)
  posts: Post[];

  @BelongsToMany(() => User, () => Followed, 'userId', 'followedId')
  followed: User[];

  @BelongsToMany(() => User, () => Follower, 'userId', 'followerId')
  followers: User[];
}

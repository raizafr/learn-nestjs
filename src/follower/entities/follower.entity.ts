import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from 'src/auth/users/entities/user.entity';

@Table
export class Follower extends Model<Follower> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => User)
  @Column
  followerId: number;

  @BelongsTo(() => User, { foreignKey: 'userId', as: 'user' })
  user: User;

  @BelongsTo(() => User, { foreignKey: 'followerId', as: 'followerUser' })
  followerUser: User;
}

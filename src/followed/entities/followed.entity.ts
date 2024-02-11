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
export class Followed extends Model<Followed> {
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
  followedId: number;

  @BelongsTo(() => User, { foreignKey: 'userId', as: 'user' })
  user: User;

  @BelongsTo(() => User, { foreignKey: 'followedId', as: 'followedUser' })
  followedUser: User;
}

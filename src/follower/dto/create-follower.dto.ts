import { IsNumber } from 'class-validator';

export class CreateFollowerDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  followerId: number;
}

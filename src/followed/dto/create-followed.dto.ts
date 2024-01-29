import { IsNumber } from 'class-validator';

export class CreateFollowedDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  followedId: number;
}

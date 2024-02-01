import { IsNumber } from 'class-validator';

export class DeletePostDto {
  @IsNumber()
  postId: number;
}

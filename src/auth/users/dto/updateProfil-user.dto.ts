import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateProfilDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  fullName: string;

  @IsNotEmpty()
  userName: string;

  @IsOptional()
  profilePictureUrl: string;

  @IsOptional()
  bio: string;

  @IsOptional()
  gender: string;
}

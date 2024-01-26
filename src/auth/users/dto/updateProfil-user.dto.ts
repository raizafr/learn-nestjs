import { IsNotEmpty } from 'class-validator';

export class UpdateProfilDto {
  @IsNotEmpty()
  fullName: string;

  @IsNotEmpty()
  userName: string;

  @IsNotEmpty()
  profilPictureUrl: string;

  @IsNotEmpty()
  bio: string;

  @IsNotEmpty()
  gender: string;
}

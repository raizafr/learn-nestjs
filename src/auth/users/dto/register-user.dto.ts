import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterUserDto {
  id: number;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  fullName: string;

  @IsNotEmpty()
  userName: string;

  profilePicture: string;

  @IsNotEmpty()
  password: string;
}

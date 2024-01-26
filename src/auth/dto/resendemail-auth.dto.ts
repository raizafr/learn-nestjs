import { IsEmail } from 'class-validator';

export class ResendEmailAuthDto {
  @IsEmail()
  email: string;
}

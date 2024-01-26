import { IsEmail, IsNotEmpty } from 'class-validator';

export class VerificationOtpAuthDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  otpCode: string;
}

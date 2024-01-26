import {
  Controller,
  Post,
  Body,
  Res,
  UseGuards,
  Get,
  Req,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users/users.service';
import { RegisterUserDto } from './users/dto/register-user.dto';
import { LoginUserDto } from './users/dto/login-user.dto';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ResendEmailAuthDto } from './dto/resendemail-auth.dto';
import { VerificationOtpAuthDto } from './dto/verification-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('register')
  register(@Body() registerUserdto: RegisterUserDto) {
    return this.usersService.create(registerUserdto);
  }

  @Post('login')
  login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.login(loginUserDto, res);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Req() req: Request, @Res() res: Response) {
    const token = req.headers.authorization.split(' ')[1];
    return this.authService.getUserFromToken(token, res);
  }

  @Delete('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    return this.authService.logout(req, res);
  }

  @Post('resend-email')
  async resendOtp(
    @Body() resendEmailAuthDto: ResendEmailAuthDto,
    @Res() res: Response,
  ) {
    return this.authService.resendOtpCode(resendEmailAuthDto, res);
  }

  @Post('verification-otp')
  async verifyOtp(
    @Body() verificationAuthDto: VerificationOtpAuthDto,
    @Res() res: Response,
  ) {
    return this.authService.verifyOtp(verificationAuthDto, res);
  }
}

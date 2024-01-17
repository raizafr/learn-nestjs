import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users/users.service';
import { LoginUserDto } from './users/dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(loginUserDto: LoginUserDto, res: Response) {
    const user = await this.usersService.findOne(loginUserDto.email);
    if (!user) {
      res.status(404);
      throw new NotFoundException('not found');
    }
    const isMatch = await bcrypt.compare(loginUserDto.password, user.password);
    if (!isMatch) {
      res.status(401);
      throw new UnauthorizedException('wrong password');
    }
    res.status(200);
    res.cookie('access_token', this.jwtService.sign(loginUserDto), {
      httpOnly: true,
    });
    return { access_token: this.jwtService.sign(loginUserDto) };
  }

  async login(loginUserDto: LoginUserDto, res: Response) {
    try {
      const response = await this.validateUser(loginUserDto, res);
      return response;
    } catch (err) {
      return err;
    }
  }

  async getUserFromToken(token: string) {
    try {
      const { email } = this.jwtService.verify(token);
      const dataUser = await this.usersService.findOne(email);
      return dataUser;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  logout(req: Request, res: Response) {
    res.clearCookie('access_token');
    return res.status(200).json({ message: 'Logout berhasil' });
  }
}

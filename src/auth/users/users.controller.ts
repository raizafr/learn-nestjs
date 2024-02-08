import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateProfilDto } from './dto/updateProfil-user.dto';
import { Response } from 'express';
import { JwtAuthGuard } from '../jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Put('update-profile')
  updateProfil(@Body() updateProfilDto: UpdateProfilDto, @Res() res: Response) {
    return this.usersService.updateProfil(updateProfilDto, res);
  }

  @Get('find/:userName')
  findManyUserByUsername(
    @Param('userName') userName: string,
    @Res() res: Response,
  ) {
    return this.usersService.findManyUserByUsername(userName, res);
  }
}

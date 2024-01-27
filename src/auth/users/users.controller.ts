import { Body, Controller, Param, Put, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateProfilDto } from './dto/updateProfil-user.dto';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Put(':id/update-profile')
  updateProfil(
    @Param('id') userId: string,
    @Body() updateProfilDto: UpdateProfilDto,
    @Res() res: Response,
  ) {
    return this.usersService.updateProfil(userId, updateProfilDto, res);
  }
}

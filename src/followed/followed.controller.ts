import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { FollowedService } from './followed.service';
import { CreateFollowedDto } from './dto/create-followed.dto';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('followed')
export class FollowedController {
  constructor(private readonly followedService: FollowedService) {}
  @Post('add')
  addFollowed(
    @Body() createFollowedDto: CreateFollowedDto,
    @Res() res: Response,
  ) {
    return this.followedService.addFollowed(createFollowedDto, res);
  }

  @UseGuards(JwtAuthGuard)
  @Post('remove')
  removeFollowed(
    @Body() createFollowedDto: CreateFollowedDto,
    @Res() res: Response,
  ) {
    return this.followedService.removeFollowed(createFollowedDto, res);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/get-all')
  getAllFollowedById(@Param('id') id: number, @Res() res: Response) {
    return this.followedService.getAllFollowedById(id, res);
  }
}

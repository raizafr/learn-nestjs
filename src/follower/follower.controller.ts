import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { FollowerService } from './follower.service';
import { Response } from 'express';
import { CreateFollowerDto } from './dto/create-follower.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('follower')
export class FollowerController {
  constructor(private readonly followerService: FollowerService) {}

  @Post('add')
  addFollower(
    @Body() createFollowerDto: CreateFollowerDto,
    @Res() res: Response,
  ) {
    return this.followerService.addFollower(createFollowerDto, res);
  }

  @UseGuards(JwtAuthGuard)
  @Post('remove')
  removeFollower(
    @Body() createFollowerDto: CreateFollowerDto,
    @Res() res: Response,
  ) {
    return this.followerService.removeFollower(createFollowerDto, res);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/get-all')
  getAllFollowedById(@Param('id') id: number, @Res() res: Response) {
    return this.followerService.getAllFollowedById(id, res);
  }
}

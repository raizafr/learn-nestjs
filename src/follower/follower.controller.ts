import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { FollowerService } from './follower.service';
import { Response } from 'express';
import { CreateFollowerDto } from './dto/create-follower.dto';

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

  @Post('remove')
  removeFollower(
    @Body() createFollowerDto: CreateFollowerDto,
    @Res() res: Response,
  ) {
    return this.followerService.removeFollower(createFollowerDto, res);
  }

  @Get(':id/get-all')
  getAllFollowedById(@Param('id') id: number, @Res() res: Response) {
    return this.followerService.getAllFollowedById(id, res);
  }
}

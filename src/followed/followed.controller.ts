import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { FollowedService } from './followed.service';
import { CreateFollowedDto } from './dto/create-followed.dto';
import { Response } from 'express';

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

  @Post('remove')
  removeFollowed(
    @Body() createFollowedDto: CreateFollowedDto,
    @Res() res: Response,
  ) {
    return this.followedService.removeFollowed(createFollowedDto, res);
  }

  @Get(':id/get-all')
  getAllFollowedById(@Param('id') id: number, @Res() res: Response) {
    return this.followedService.getAllFollowedById(id, res);
  }
}

import { Controller, Get, Res } from '@nestjs/common';
import { DummyService } from './dummy.service';
import { Response } from 'express';

@Controller('dummy')
export class DummyController {
  constructor(private readonly dummyService: DummyService) {}
  @Get('create-many-users')
  createManyUsers(@Res() res: Response) {
    return this.dummyService.addDummyUser(res);
  }

  @Get('create-random-follower')
  createRandFollower(@Res() res: Response) {
    return this.dummyService.createRandFollower(res);
  }
}

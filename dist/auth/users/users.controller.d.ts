import { UsersService } from './users.service';
import { UpdateProfilDto } from './dto/updateProfil-user.dto';
import { Response } from 'express';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    updateProfil(updateProfilDto: UpdateProfilDto, res: Response): Promise<Response<any, Record<string, any>>>;
}

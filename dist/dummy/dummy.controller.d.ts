import { DummyService } from './dummy.service';
import { Response } from 'express';
export declare class DummyController {
    private readonly dummyService;
    constructor(dummyService: DummyService);
    createManyUsers(res: Response): Promise<void>;
}

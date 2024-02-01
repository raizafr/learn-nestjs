/// <reference types="multer" />
import { UploadService } from './upload.service';
import { CreateUploadDto } from './dto/create-upload.dto';
import { Response } from 'express';
export declare class UploadController {
    private readonly uploadService;
    constructor(uploadService: UploadService);
    uploadImage(createUploadDto: CreateUploadDto, file: Express.Multer.File, res: Response): Response<any, Record<string, any>>;
    uploadPosts(createUploadDto: CreateUploadDto, files: Array<Express.Multer.File>, res: Response): Response<any, Record<string, any>>;
}

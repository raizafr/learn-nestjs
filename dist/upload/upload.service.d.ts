/// <reference types="multer" />
import { CreateUploadDto } from './dto/create-upload.dto';
import { Response } from 'express';
export declare class UploadService {
    uploadProfileImage(createUploadDto: CreateUploadDto, file: Express.Multer.File, res: Response): Response<any, Record<string, any>>;
    uploadPosts(createUploadDto: CreateUploadDto, files: Array<Express.Multer.File>, res: Response): Response<any, Record<string, any>>;
}

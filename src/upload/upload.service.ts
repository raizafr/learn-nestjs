import { Injectable } from '@nestjs/common';
import { CreateUploadDto } from './dto/create-upload.dto';
import * as fs from 'fs';
import { Response } from 'express';

@Injectable()
export class UploadService {
  uploadProfileImage(
    createUploadDto: CreateUploadDto,
    file: Express.Multer.File,
    res: Response,
  ) {
    const { userId } = createUploadDto;
    const uploadDir = 'resource/';
    const filePath = `${uploadDir}${userId}-${file.originalname}`;

    if (fs.existsSync(filePath)) {
      return res
        .status(409)
        .json({ message: `${file.originalname} already exist` });
    }

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    fs.writeFileSync(filePath, file.buffer);
    return res.status(201).json({ message: 'image uploaded', path: filePath });
  }
}

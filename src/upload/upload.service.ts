import { Injectable } from '@nestjs/common';
import { CreateUploadDto } from './dto/create-upload.dto';
import * as fs from 'fs';

@Injectable()
export class UploadService {
  uploadProfileImage(
    createUploadDto: CreateUploadDto,
    file: Express.Multer.File,
  ) {
    const { userId } = createUploadDto;
    const uploadDir = 'resource/';
    const filePath = `${uploadDir}-${userId}-${file.originalname}`;
    console.log(file);
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    fs.writeFileSync(filePath, file.buffer);

    console.log('File berhasil disimpan:', filePath);
  }
}

import { Injectable } from '@nestjs/common';
import { CreateUploadDto } from './dto/create-upload.dto';
import * as fs from 'fs';
import { Response } from 'express';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class UploadService {
  async uploadProfileImage(
    createUploadDto: CreateUploadDto,
    file: Express.Multer.File,
    res: Response,
  ) {
    const { userId } = createUploadDto;
    const uploadDir = 'profile-picture/';
    const filePath = `${uploadDir}${userId}-${file.originalname}`;
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey);
    try {
      const { error, data } = await supabase.storage
        .from('storage')
        .upload(filePath, file.buffer);
      if (error) {
        return res.status(409).json({ message: error.message });
      }
      if (data) {
        const publicImageUrl = supabase.storage
          .from('storage')
          .getPublicUrl(filePath);
        return res.status(201).json({
          message: 'image uploaded',
          path: publicImageUrl.data.publicUrl,
        });
      }
    } catch (err) {
      return res.status(500).json({ message: 'internal server error' });
    }
  }

  uploadPosts(
    createUploadDto: CreateUploadDto,
    files: Array<Express.Multer.File>,
    res: Response,
  ) {
    const { userId } = createUploadDto;
    const uploadDir = 'resource/post/';
    const uploadedFiles = [];
    files.map((file) => {
      const filePath = `${uploadDir}${userId}-${file.originalname}`;
      if (fs.existsSync(filePath)) {
        return uploadedFiles.push({
          message: `failed ${file.originalname} already exist`,
          name: file.originalname,
        });
      }
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      fs.writeFileSync(filePath, file.buffer);
      uploadedFiles.push({
        message: 'upload success',
        name: file.originalname,
        filePath,
      });
    });
    return res.status(201).json({ data: uploadedFiles });
  }
}

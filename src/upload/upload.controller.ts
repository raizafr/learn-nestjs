import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Body,
  ParseFilePipe,
  FileTypeValidator,
  Res,
  UploadedFiles,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUploadDto } from './dto/create-upload.dto';
import { Response } from 'express';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @UseGuards(JwtAuthGuard)
  @Post('profile-image')
  @UseInterceptors(FileInterceptor('image'))
  uploadImage(
    @Body() createUploadDto: CreateUploadDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'image/*' })],
      }),
    )
    file: Express.Multer.File,
    @Res() res: Response,
  ) {
    return this.uploadService.uploadProfileImage(createUploadDto, file, res);
  }

  @Post('post')
  @UseInterceptors(FilesInterceptor('images'))
  uploadPosts(
    @Body() createUploadDto: CreateUploadDto,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({
            fileType:
              '.(png|jpeg|jpg|webp|mp4|avchd|mpg|webm|3gp|flv|mov|avi|wmv|mkv)',
          }),
        ],
      }),
    )
    files: Array<Express.Multer.File>,
    @Res() res: Response,
  ) {
    return this.uploadService.uploadPosts(createUploadDto, files, res);
  }
}

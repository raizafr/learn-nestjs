import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsArray,
  ArrayMinSize,
} from 'class-validator';

export class ContentType {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  path: string;
}

export class CreatePostDto {
  @IsNumber()
  userId: number;

  @IsString()
  caption: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  content: ContentType[];
}

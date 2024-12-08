import { IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateCommentDto {
  @IsNotEmpty()
  blog_id: string | Types.ObjectId;

  user_id: string | Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  content: string;
}

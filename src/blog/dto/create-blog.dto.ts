import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateBlogDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsMongoId()
  community_id: Types.ObjectId | string;

  user_id: Types.ObjectId | string;
}

export class SearchBlogDto {
  @IsString()
  search: string;

  community_id: Types.ObjectId | string;

  user_id: Types.ObjectId | string;
}

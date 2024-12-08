import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { HydratedDocument } from 'mongoose';
import { Document, Types } from 'mongoose';

export type CommentDocument = Comment & Document; //HydratedDocument<Users>;

@Schema({ timestamps: true })
export class Comment {
  @Prop()
  content: string;

  @Prop({ type: Types.ObjectId, index: true, ref: 'User' })
  user_id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, index: true, ref: 'Blog' })
  blog_id: Types.ObjectId;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

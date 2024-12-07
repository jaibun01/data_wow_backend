import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { HydratedDocument } from 'mongoose';
import { Document, Types } from 'mongoose';

export type BlogDocument = Blog & Document; //HydratedDocument<Users>;

@Schema({ timestamps: true })
export class Blog {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({ type: Types.ObjectId, index: true, ref: 'Community' })
  community_id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, index: true, ref: 'User' })
  user_id: Types.ObjectId;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);

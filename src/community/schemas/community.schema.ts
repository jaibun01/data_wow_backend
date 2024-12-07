import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { HydratedDocument } from 'mongoose';
import { Document } from 'mongoose';

export type CommunityDocument = Community & Document; //HydratedDocument<Users>;

@Schema({ timestamps: true })
export class Community {
  @Prop({ unique: true })
  title: string;
}

export const CommunitySchema = SchemaFactory.createForClass(Community);

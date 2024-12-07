import { Injectable } from '@nestjs/common';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Community, CommunityDocument } from './schemas/community.schema';
import { Model } from 'mongoose';

@Injectable()
export class CommunityService {
  constructor(
    @InjectModel(Community.name)
    private readonly communityModel: Model<CommunityDocument>,
  ) {}
  async create(createCommunityDto: CreateCommunityDto[]): Promise<Community[]> {
    const community = await this.communityModel.create(createCommunityDto);
    return community;
  }

  findAll(): Promise<{ id: string; title: string }[]> {
    return this.communityModel.find().select('id title');
  }

  findOne(id: number) {
    return `This action returns a #${id} community`;
  }

  update(id: number, updateCommunityDto: UpdateCommunityDto) {
    console.log('updateCommunityDto', updateCommunityDto);
    return `This action updates a #${id} community`;
  }

  remove(id: number) {
    return `This action removes a #${id} community`;
  }
}

import { Injectable } from '@nestjs/common';
import { CreateBlogDto, SearchBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Blog, BlogDocument } from './schemas/blog.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog.name)
    private readonly blogModel: Model<BlogDocument>,
  ) {}
  create(createBlogDto: CreateBlogDto) {
    createBlogDto.community_id = new Types.ObjectId(createBlogDto.community_id);
    const create = this.blogModel.create(createBlogDto);
    return create;
  }

  findAll(request: SearchBlogDto) {
    const filter = {};
    if (request.search) {
      filter['title'] = { $regex: request.search, $options: 'i' };
    }
    if (request.community_id) {
      filter['community_id'] = new Types.ObjectId(request.community_id);
    }
    return this.blogModel
      .find(filter)
      .populate({ path: 'community_id', select: '_id title' })
      .populate({ path: 'user_id', select: '_id username' })
      .select('_id title description');
  }

  findMyBlog(request: SearchBlogDto) {
    const filter = { user_id: request.user_id };
    if (request.search) {
      filter['title'] = { $regex: request.search, $options: 'i' };
    }
    if (request.community_id) {
      filter['community_id'] = new Types.ObjectId(request.community_id);
    }
    return this.blogModel
      .find(filter)
      .populate({ path: 'community_id', select: '_id title' })
      .populate({ path: 'user_id', select: '_id username' })
      .select('_id title description');
  }

  findOne(id: string) {
    return this.blogModel
      .findById(id)
      .populate({ path: 'community_id', select: '_id title' })
      .populate({ path: 'user_id', select: '_id username' })
      .select('_id title description');
  }

  update(id: string, updateBlogDto: UpdateBlogDto) {
    updateBlogDto.community_id = new Types.ObjectId(updateBlogDto.community_id);
    const updated = this.blogModel.findByIdAndUpdate(
      new Types.ObjectId(id),
      updateBlogDto,
      { new: true },
    );
    return updated;
  }

  remove(id: string) {
    return this.blogModel.deleteOne({ _id: new Types.ObjectId(id) });
  }
}

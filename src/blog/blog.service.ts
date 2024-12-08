import { Injectable } from '@nestjs/common';
import { CreateBlogDto, SearchBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Blog, BlogDocument } from './schemas/blog.schema';
import { Model, Types } from 'mongoose';
import { Comment, CommentDocument } from '../comment/schemas/comment.schema';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog.name)
    private readonly blogModel: Model<BlogDocument>,
    @InjectModel(Comment.name)
    private readonly commentModel: Model<CommentDocument>,
  ) {}
  create(createBlogDto: CreateBlogDto) {
    createBlogDto.community_id = new Types.ObjectId(createBlogDto.community_id);
    const create = this.blogModel.create(createBlogDto);
    return create;
  }

  async findAll(request: SearchBlogDto): Promise<any> {
    const filter = {};
    if (request.search) {
      filter['title'] = { $regex: request.search, $options: 'i' };
    }
    if (request.community_id) {
      filter['community_id'] = new Types.ObjectId(request.community_id);
    }
    const blogs = await this.blogModel
      .find(filter)
      .populate({ path: 'community_id', select: '_id title' })
      .populate({ path: 'user_id', select: '_id username' })
      .lean()
      .select('_id title description');
    const list = await Promise.all(
      blogs.map(async (blog) => {
        const comments = await this.commentModel.find({
          blog_id: new Types.ObjectId(blog._id?.toString()),
        });
        return { ...blog, comments: comments.length };
      }),
    );
    return list;
  }

  async findMyBlog(request: SearchBlogDto): Promise<any> {
    const filter = { user_id: request.user_id };
    if (request.search) {
      filter['title'] = { $regex: request.search, $options: 'i' };
    }
    if (request.community_id) {
      filter['community_id'] = new Types.ObjectId(request.community_id);
    }
    const blogs = await this.blogModel
      .find(filter)
      .populate({ path: 'community_id', select: '_id title' })
      .populate({ path: 'user_id', select: '_id username' })
      .lean()
      .select('_id title description');
    const list = await Promise.all(
      blogs.map(async (blog) => {
        const comments = await this.commentModel.find({
          blog_id: new Types.ObjectId(blog._id?.toString()),
        });
        return { ...blog, comments: comments.length };
      }),
    );
    return list;
  }

  async findOne(id: string): Promise<any> {
    const blogs = await this.blogModel
      .findById(id)
      .populate({ path: 'community_id', select: '_id title' })
      .populate({ path: 'user_id', select: '_id username' })
      .lean()
      .select('_id title description');
    const comments = await this.commentModel.find({
      blog_id: new Types.ObjectId(id?.toString()),
    });
    return { ...blogs, comments: comments.length };
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

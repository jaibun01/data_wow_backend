import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto, SearchBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Request } from 'express';
import { Types } from 'mongoose';
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Req() req: Request, @Body() createBlogDto: CreateBlogDto) {
    const user = (req as any).user;
    createBlogDto.user_id = new Types.ObjectId(user.sub);
    return this.blogService.create(createBlogDto);
  }

  @Post('all')
  findAll(@Body() searchBlogDto: SearchBlogDto) {
    return this.blogService.findAll(searchBlogDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Post('me')
  myBlogs(@Req() req: Request, @Body() searchBlogDto: SearchBlogDto) {
    const user = (req as any).user;
    searchBlogDto.user_id = new Types.ObjectId(user.sub);
    return this.blogService.findMyBlog(searchBlogDto);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogService.update(id, updateBlogDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogService.remove(id);
  }
}

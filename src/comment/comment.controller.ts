import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Types } from 'mongoose';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Req() req: Request, @Body() createCommentDto: CreateCommentDto) {
    const user = (req as any).user;
    createCommentDto.user_id = new Types.ObjectId(user.sub);
    createCommentDto.blog_id = new Types.ObjectId(createCommentDto.blog_id);
    return this.commentService.create(createCommentDto);
  }

  @Get(':blog_id')
  findAll(@Param('blog_id') blog_id: string) {
    return this.commentService.findAll(blog_id);
  }
}

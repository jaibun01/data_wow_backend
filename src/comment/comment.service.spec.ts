import { Test, TestingModule } from '@nestjs/testing';
import { CommentService } from './comment.service';
import { getModelToken } from '@nestjs/mongoose'; // Import for mocking the model
import { Comment } from './schemas/comment.schema'; // Import the Comment schema
import { Types } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';

describe('CommentService', () => {
  let service: CommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentService,
        {
          provide: getModelToken(Comment.name),
          useValue: {
            create: jest.fn().mockResolvedValue({
              _id: new Types.ObjectId(), // Mock valid ObjectId
              content: 'This is a comment',
              blog_id: new Types.ObjectId(), // Mock valid ObjectId
              user_id: new Types.ObjectId(), // Mock valid ObjectId
            }),
            find: jest.fn().mockResolvedValue([
              {
                _id: new Types.ObjectId(),
                content: 'This is a comment',
                blog_id: new Types.ObjectId(),
                user_id: new Types.ObjectId(),
              },
            ]),
          },
        },
      ],
    }).compile();

    service = module.get<CommentService>(CommentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a comment successfully', async () => {
    const newComment = {
      content: 'This is a comment',
      blog_id: new Types.ObjectId(), // Pass valid ObjectId
      user_id: new Types.ObjectId(), // Pass valid ObjectId
    };

    const result = await service.create(
      newComment as unknown as CreateCommentDto,
    );

    expect(result).toEqual({
      _id: expect.any(Types.ObjectId), // Expect the returned _id to be a valid ObjectId
      content: 'This is a comment',
      blog_id: expect.any(Types.ObjectId),
      user_id: expect.any(Types.ObjectId),
    });
  });
});

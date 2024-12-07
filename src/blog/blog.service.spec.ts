import { Test, TestingModule } from '@nestjs/testing';
import { BlogService } from './blog.service';
import { Blog, BlogDocument } from './schemas/blog.schema';
import { getModelToken } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

describe('BlogService', () => {
  let service: BlogService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let model: Model<BlogDocument>;
  const mockBlogModel = {
    create: jest.fn().mockResolvedValue({
      _id: 'mockId',
      title: 'Mock Title',
      description: 'Mock Description',
      community_id: '507f1f77bcf86cd799439011',
    }),
    find: jest.fn().mockReturnValue({
      select: jest.fn().mockReturnThis(), // Mock select method to return the query itself
    }),
    findById: jest.fn().mockReturnValue({
      select: jest.fn().mockReturnThis(), // Mock select method for findById
    }),
    findByIdAndUpdate: jest.fn().mockResolvedValue({
      _id: 'mockId',
      title: 'Updated Title',
      description: 'Updated Description',
    }),
    deleteOne: jest.fn().mockResolvedValue({ deletedCount: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlogService,
        {
          provide: getModelToken(Blog.name),
          useValue: mockBlogModel,
        },
      ],
    }).compile();

    service = module.get<BlogService>(BlogService);
    model = module.get<Model<BlogDocument>>(getModelToken(Blog.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should successfully create a blog', async () => {
      const createBlogDto: CreateBlogDto = {
        title: 'New Blog',
        description: 'Description of the new blog',
        community_id: '507f1f77bcf86cd799439011', // Valid ObjectId
        user_id: '507f1f77bcf86cd799439011',
      };
      const result = await service.create(createBlogDto);
      expect(result).toHaveProperty('_id');
      expect(result.title).toBe('Mock Title');
      expect(mockBlogModel.create).toHaveBeenCalledWith(createBlogDto);
    });
  });

  // describe('findAll', () => {
  //   it('should return an array of blogs', async () => {
  //     const result = await service.findAll();
  //     expect(result).toEqual([
  //       { _id: 'mockId', title: 'Mock Title', description: 'Mock Description' },
  //     ]);
  //     expect(mockBlogModel.find).toHaveBeenCalled();
  //   });
  // });

  // describe('findOne', () => {
  //   it('should return a single blog', async () => {
  //     const result = await service.findOne('mockId');
  //     expect(result).toEqual({
  //       _id: 'mockId',
  //       title: 'Mock Title',
  //       description: 'Mock Description',
  //     });
  //     expect(mockBlogModel.findById).toHaveBeenCalledWith('mockId');
  //   });
  // });

  describe('update', () => {
    it('should update and return the blog', async () => {
      const updateBlogDto: UpdateBlogDto = {
        title: 'Updated Title',
        description: 'Updated Description',
        community_id: new Types.ObjectId('675486b079607b13c1ddc6c2'),
      };
      const result = await service.update(
        '675486b079607b13c1ddc6c2',
        updateBlogDto,
      );
      expect(result).toEqual({
        _id: 'mockId',
        title: 'Updated Title',
        description: 'Updated Description',
      });
      expect(mockBlogModel.findByIdAndUpdate).toHaveBeenCalledWith(
        expect.any(Types.ObjectId),
        updateBlogDto,
        { new: true },
      );
    });
  });

  describe('remove', () => {
    it('should delete a blog', async () => {
      const result = await service.remove('675486b079607b13c1ddc6c2');
      expect(result).toEqual({ deletedCount: 1 });
      expect(mockBlogModel.deleteOne).toHaveBeenCalledWith({
        _id: new Types.ObjectId('675486b079607b13c1ddc6c2'),
      });
    });
  });
});

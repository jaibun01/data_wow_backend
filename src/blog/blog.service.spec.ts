import { Test, TestingModule } from '@nestjs/testing';
import { BlogService } from './blog.service';
import { Blog, BlogDocument } from './schemas/blog.schema';
import { getModelToken } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Comment } from '../comment/schemas/comment.schema';

describe('BlogService', () => {
  let service: BlogService;
  let blogModel: any;
  let commentModel: any;
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
    // Mocking BlogModel and CommentModel
    blogModel = {
      create: jest.fn(),
      find: jest.fn(),
      findById: jest.fn(),
      findByIdAndUpdate: jest.fn(),
      deleteOne: jest.fn(),
    };

    commentModel = {
      find: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlogService,
        {
          provide: getModelToken(Blog.name),
          useValue: blogModel,
        },
        {
          provide: getModelToken(Comment.name),
          useValue: commentModel,
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
      if (result) {
        expect(result).toHaveProperty('_id');
        expect(result.title).toBe('Mock Title');
        expect(mockBlogModel.create).toHaveBeenCalledWith(createBlogDto);
      }
    });
  });

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
      if (result) {
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
      }
    });
  });

  describe('remove', () => {
    it('should delete a blog', async () => {
      const result = await service.remove('675486b079607b13c1ddc6c2');
      if (result) {
        expect(result).toEqual({
          acknowledged: true,
          deletedCount: 1,
        });
        expect(mockBlogModel.deleteOne).toHaveBeenCalledWith({
          _id: new Types.ObjectId('675486b079607b13c1ddc6c2'),
        });
      }
    });
    it('should delete a blog can not remove', async () => {
      const result = await service.remove('675486b079607b13c1ddc6c2');
      expect(result).toEqual(undefined);
    });
  });

  describe('BlogService.findAll', () => {
    let service: BlogService;
    let blogModelMock;
    let commentModelMock;

    beforeEach(async () => {
      blogModelMock = {
        find: jest.fn().mockReturnThis(),
        populate: jest.fn().mockReturnThis(),
        lean: jest.fn().mockReturnThis(),
        select: jest.fn().mockResolvedValue([]),
      };

      commentModelMock = {
        find: jest.fn().mockResolvedValue([]),
      };

      const module: TestingModule = await Test.createTestingModule({
        providers: [
          BlogService,
          { provide: getModelToken('Blog'), useValue: blogModelMock },
          { provide: getModelToken('Comment'), useValue: commentModelMock },
        ],
      }).compile();

      service = module.get<BlogService>(BlogService);
    });

    it('should return blogs with comment counts', async () => {
      const mockBlogs = [
        {
          _id: new Types.ObjectId(),
          title: 'Blog 1',
          description: 'Description 1',
        },
        {
          _id: new Types.ObjectId(),
          title: 'Blog 2',
          description: 'Description 2',
        },
      ];

      const mockComments = [
        [{ _id: new Types.ObjectId(), blog_id: mockBlogs[0]._id }], // 1 comment for Blog 1
        [], // 0 comments for Blog 2
      ];

      blogModelMock.select.mockResolvedValueOnce(mockBlogs);
      commentModelMock.find.mockImplementation(({ blog_id }) => {
        return Promise.resolve(
          mockComments.find((comments) =>
            comments.some(
              (comment) => comment.blog_id.toString() === blog_id.toString(),
            ),
          ) || [],
        );
      });

      const result = await service.findAll({
        search: 'Blog',
        community_id: null,
        user_id: '',
      });

      expect(blogModelMock.find).toHaveBeenCalledWith({
        title: { $regex: 'Blog', $options: 'i' },
      });
      expect(blogModelMock.populate).toHaveBeenCalledWith({
        path: 'community_id',
        select: '_id title',
      });
      expect(blogModelMock.populate).toHaveBeenCalledWith({
        path: 'user_id',
        select: '_id username',
      });
      expect(result).toEqual([
        { ...mockBlogs[0], comments: 1 },
        { ...mockBlogs[1], comments: 0 },
      ]);
    });

    it('should filter by community_id if provided', async () => {
      const communityId = new Types.ObjectId();
      await service.findAll({
        search: null,
        community_id: communityId.toString(),
        user_id: '',
      });

      expect(blogModelMock.find).toHaveBeenCalledWith({
        community_id: communityId,
      });
    });

    it('should handle no blogs found', async () => {
      blogModelMock.select.mockResolvedValueOnce([]);

      const result = await service.findAll({
        search: null,
        community_id: null,
        user_id: '',
      });

      expect(result).toEqual([]);
    });
  });
});

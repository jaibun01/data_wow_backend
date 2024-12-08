import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { UsersService } from './user.service';

describe('UsersService', () => {
  let service: UsersService;
  let mockUserModel: any;

  beforeEach(async () => {
    mockUserModel = {
      findOne: jest.fn().mockReturnValue({
        select: jest.fn().mockResolvedValue(null),
      }),
      create: jest.fn(),
      save: jest.fn(),
      constructor: jest.fn().mockImplementation(function (this: any, dto: any) {
        Object.assign(this, dto);
        this.save = jest.fn().mockResolvedValue(this);
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a user if found', async () => {
      const mockUser = {
        _id: '1',
        username: 'john',
        password: 'hashedpassword',
      };
      mockUserModel.findOne.mockReturnValue({
        select: jest.fn().mockResolvedValue(mockUser),
      });

      const result = await service.findOne('john');
      expect(result).toEqual({
        _id: '1',
        username: 'john',
        password: 'hashedpassword',
      });
      expect(mockUserModel.findOne).toHaveBeenCalledWith({ username: 'john' });
    });

    it('should return undefined if no user is found', async () => {
      mockUserModel.findOne.mockReturnValue({
        select: jest.fn().mockResolvedValue(null),
      });

      const result = await service.findOne('nonexistent');
      expect(result).toBeNull();
      expect(mockUserModel.findOne).toHaveBeenCalledWith({
        username: 'nonexistent',
      });
    });
  });
});

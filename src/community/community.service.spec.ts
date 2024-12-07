import { Test, TestingModule } from '@nestjs/testing';
import { CommunityService } from './community.service';
import { getModelToken } from '@nestjs/mongoose';
import { Community } from './schemas/community.schema';
import { Model } from 'mongoose';

const mockCommunityModel = {
  create: jest.fn((dto) => ({ ...dto, _id: '12345' })),
  find: jest.fn(() => ({
    select: jest.fn().mockReturnValue([{ id: '123', title: 'Test Community' }]),
  })),
};

describe('CommunityService', () => {
  let service: CommunityService;
  let model: Model<Community>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommunityService,
        {
          provide: getModelToken(Community.name),
          useValue: mockCommunityModel,
        },
      ],
    }).compile();

    service = module.get<CommunityService>(CommunityService);
    model = module.get<Model<Community>>(getModelToken(Community.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new community', async () => {
      const dto = [{ title: 'New Community' }];
      const result = await service.create(dto);
      expect(result).toEqual({ ...dto, _id: '12345' });
      expect(model.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return an array of communities with selected fields', async () => {
      const result = await service.findAll();
      expect(result).toEqual([{ id: '123', title: 'Test Community' }]);
      expect(model.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a placeholder string', async () => {
      const result = service.findOne(1);
      expect(result).toBe('This action returns a #1 community');
    });
  });

  describe('update', () => {
    it('should return a placeholder string with the ID', async () => {
      const dto = { title: 'Updated Community' };
      const result = service.update(1, dto);
      expect(result).toBe('This action updates a #1 community');
    });
  });

  describe('remove', () => {
    it('should return a placeholder string with the ID', async () => {
      const result = service.remove(1);
      expect(result).toBe('This action removes a #1 community');
    });
  });
});

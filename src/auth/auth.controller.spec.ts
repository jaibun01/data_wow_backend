import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

// Mock AuthService
const mockAuthService = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  signIn: jest.fn((username, password) => ({
    accessToken: 'test-token',
  })),
  findAll: jest.fn(() => [
    { id: 1, username: 'user1' },
    { id: 2, username: 'user2' },
  ]),
  findOne: jest.fn((id) => ({ id, username: `user${id}` })),
  update: jest.fn((id, dto) => ({ id, ...dto })),
  remove: jest.fn((id) => ({ id, deleted: true })),
};

// Mock AuthGuard
const mockAuthGuard = jest.fn().mockImplementation(() => true);

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockAuthGuard)
      .compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signIn', () => {
    it('should return an access token', async () => {
      const result = await controller.signIn({
        username: 'test',
        password: 'password',
      });
      expect(result).toEqual({ accessToken: 'test-token' });
      expect(service.signIn).toHaveBeenCalledWith('test', 'password');
    });
  });

  describe('getProfile', () => {
    it('should return the user profile', () => {
      const req = { user: { id: 1, username: 'testUser' } };
      expect(controller.getProfile(req)).toEqual(req.user);
    });
  });

  describe('findAll', () => {
    it('should return a list of users', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([
        { id: 1, username: 'user1' },
        { id: 2, username: 'user2' },
      ]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single user by ID', async () => {
      const result = await controller.findOne('1');
      expect(result).toEqual({ id: 1, username: 'user1' });
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update a user and return the updated user', async () => {
      const dto = { username: 'updatedUser' };
      const result = await controller.update('1', dto);
      expect(result).toEqual({ id: 1, ...dto });
      expect(service.update).toHaveBeenCalledWith(1, dto);
    });
  });

  describe('remove', () => {
    it('should remove a user and return the result', async () => {
      const result = await controller.remove('1');
      expect(result).toEqual({ id: 1, deleted: true });
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});

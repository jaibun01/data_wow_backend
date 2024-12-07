import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../user/user.service';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

// Mock UsersService
const mockUsersService = {
  findOne: jest.fn((username: string) => {
    if (username === 'validUser') {
      return {
        _id: '123',
        username: 'validUser',
        password: bcrypt.hashSync('validPassword', 10),
      };
    }
    return null;
  }),
};

// Mock JwtService
const mockJwtService = {
  signAsync: jest.fn((payload) => `mockToken-${payload.sub}`),
};

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    // usersService = module.get<UsersService>(UsersService);
    // jwtService = module.get<JwtService>(JwtService);
  });

  // it('should be defined', () => {
  //   expect(authService).toBeDefined();
  // });

  describe('update', () => {
    it('should log the DTO and return a string', () => {
      const result = authService.update(1, { username: 'updated' });
      expect(result).toBe('This action updates a #1 auth');
    });
  });

  describe('remove', () => {
    it('should return a string with the ID', () => {
      expect(authService.remove(1)).toBe('This action removes a #1 auth');
    });
  });
});

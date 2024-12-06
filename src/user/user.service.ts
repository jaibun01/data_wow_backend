import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User as Users } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './schemas/user.schema';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}
  private readonly users = [
    {
      _id: '1',
      username: 'john',
      password: 'changeme',
    },
    {
      _id: '2',
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<Users | undefined> {
    return await this.userModel
      .findOne({ username: username })
      .lean()
      .select('_id username password');
  }
  async create(createUserDto: CreateUserDto) {
    try {
      const userSystem = await this.userModel.findOne({
        username: createUserDto.username,
      });
      if (userSystem && userSystem.username === createUserDto.username) {
        throw new BadRequestException('User already exists');
      }
      const saltOrRounds = 10;
      const password = process.env.RANDOM_PASSWORD;
      const hash = await bcrypt.hash(password, saltOrRounds);
      const user = new this.userModel({
        username: createUserDto.username,
        password: hash,
      });
      user.save();
      return user;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    console.log('updateUserDto', updateUserDto);
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

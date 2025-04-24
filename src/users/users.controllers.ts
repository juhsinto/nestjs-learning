import {
  Body,
  Controller,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { GetUserParamDto } from 'src/dtos/get-user-param.dto';
import { User } from './types';
// import { GetUserParamDto } from 'src/dtos/get-user-param.dto';

@Controller('users')
export class UsersController {
  usersService: UsersService;

  constructor() {
    this.usersService = new UsersService();
  }

  @Get()
  getUsers(@Query() queryString: { gender: string }): User[] {
    const usersService = new UsersService();
    if (queryString?.gender) {
      return usersService
        .getAllUsers()
        .filter((u) => u.gender === queryString.gender);
    }

    console.log('jm: get all users');
    return usersService.getAllUsers();
  }

  @Get(':id')
  // getUser(@Param('id', new DefaultValuePipe(1), ParseIntPipe) id: number) {
  getUser(@Param('id', ParseIntPipe) id: number) {
    console.log('jm: get users by id ', id);

    return this.usersService.getUserById(id);
  }

  @Get('filter/:isMarried')
  getUsersFiltered(@Param('isMarried', ParseBoolPipe) isMarried: boolean) {
    console.log('jm: get users filtered by param ', isMarried);
    // This handler runs when isMarried is provided
    return this.usersService.getUsersIsMarried(isMarried);
  }

  @Post()
  createUser(
    @Body()
    user: CreateUserDto,
  ) {
    console.log('creating a new user with details ' + JSON.stringify(user));
    return this.usersService.createUser(user);
  }
}

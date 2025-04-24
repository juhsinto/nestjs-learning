import {
  Body,
  Controller,
  // DefaultValuePipe,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from 'src/dtos/create-user.dto';
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
    if (queryString?.gender) {
      return this.usersService
        .getAllUsers()
        .filter((u) => u.gender === queryString.gender);
    }

    console.log('jm: get all users');
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  // getUser(@Param('id', new DefaultValuePipe(1), ParseIntPipe) id: number) {
  getUser(@Param('id', ParseIntPipe) id: number) {
    console.log('jm: get users by id ', id);

    return this.usersService.getUserById(id);
  }

  @Get('married/:isMarried')
  getUsersFiltered(@Param('isMarried', ParseBoolPipe) married: boolean) {
    console.log('jm: get users filtered by param ', married);

    // This handler runs when isMarried is provided
    return this.usersService.getUsersIsMarried(married);
  }

  @Post()
  createUser(
    @Body()
    user: CreateUserDto,
  ) {
    console.log(
      'attempting to creating a new user with details ' + JSON.stringify(user),
    );
    const response = this.usersService.createUser(user);

    return response;
  }
}

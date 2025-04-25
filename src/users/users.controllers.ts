import {
  Body,
  Controller,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { User } from './types';
import { UsersService } from './users.service';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { UpdateUserDto } from 'src/dtos/update-user.dto';

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

  @Patch()
  updateUser(@Body() user: UpdateUserDto) {
    console.log(
      'attempting to update a new user with details ' + JSON.stringify(user),
    );
    const response = this.usersService.updateUser(user);
    return response;
  }
}

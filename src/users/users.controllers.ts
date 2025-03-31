import { Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './types';

@Controller('users')
export class UsersController {
  @Get()
  getUsers(): User[] {
    const usersService = new UsersService();
    // const users =
    return usersService.getAllUsers();
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    console.log(id);
    const usersService = new UsersService();
    // const users =
    return usersService.getUserById(+id);
  }

  @Post()
  createUser() {
    const user = {
      id: 3,
      name: 'merry',
      age: 23,
      gender: 'female',
      isMarried: false,
    };
    const userService = new UsersService();
    userService.createUser(user);
    return 'success';
  }
}

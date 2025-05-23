import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { PaginationQueryDto } from 'src/common/pagination/dto/pagination-query.dto';
// import { UpdateUserDto } from 'src/dtos/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // @Get()
  // getUsers(@Query() queryString: { gender: string }): User[] | string {
  //   if (queryString?.gender) {
  //     console.log('jm: get users by gender querystring');

  //     const users = this.usersService.getAllUsers();
  //     return Array.isArray(users)
  //       ? users.filter((u) => u.gender === queryString.gender)
  //       : users;
  //   }

  //   console.log('jm: get all users');
  //   return this.usersService.getAllUsers();
  // }

  @Get(':id')
  // getUser(@Param('id', new DefaultValuePipe(1), ParseIntPipe) id: number) {
  getUser(@Param('id', ParseIntPipe) id: number) {
    console.log('jm: get users by id ', id);

    return this.usersService.findUserById(id);
  }

  // @Get('married/:isMarried')
  // getUsersFiltered(@Param('isMarried', ParseBoolPipe) married: boolean) {
  //   console.log('jm: get users filtered by param ', married);

  //   // This handler runs when isMarried is provided
  //   return this.usersService.getUsersIsMarried(married);
  // }

  @Get()
  getUsers(@Query() paginationQueryDto: PaginationQueryDto) {
    console.log('jm: attempting to get all users');

    return this.usersService.getAllUsers(paginationQueryDto);
  }

  @Post()
  createUser(
    @Body()
    user: CreateUserDto,
  ) {
    console.log(
      'jm: attempting to creating a new user with details ' +
        JSON.stringify(user),
    );
    const response = this.usersService.createUser(user);

    return response;
  }

  // @Patch()
  // updateUser(@Body() user: UpdateUserDto) {
  //   console.log(
  //     'jm: attempting to update a new user with details ' +
  //       JSON.stringify(user),
  //   );
  //   const response = this.usersService.updateUser(user);
  //   return response;
  // }

  @Delete(':id')
  public deleteUser(@Param('id', ParseIntPipe) id: number) {
    this.usersService.deleteUser(id);
  }
}

import { HttpException, HttpStatus } from '@nestjs/common';
import { User } from './types';

export class UsersService {
  users: User[] = [
    {
      id: 1,
      name: 'John',
      email: 'john@gmail.com',
      // age: 28,
      gender: 'male',
      isMarried: false,
    },
    {
      id: 2,
      name: 'fgfd',
      email: 'gffd@gmail.com',
      // age: 34,
      gender: 'fa',
      isMarried: true,
    },
  ];

  getAllUsers() {
    return this.users;
  }

  getUserById(id: number) {
    const user = this.users.find((x) => x.id === id);
    return user ?? 'No user found';
  }

  createUser(user: User) {
    if (this.users.find((x) => x.id === user.id)) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    this.users.push(user);
  }

  getUsersIsMarried(isMarried: boolean) {
    const user = this.users.find((x) => x.isMarried === isMarried);
    return user;
  }

  updateUser(newUserDetails: Partial<User>) {
    console.log('trying to update with ', newUserDetails);
    const user = this.users.find((user) => {
      if (user.id === newUserDetails.id) {
        if (newUserDetails?.email) {
          user.email = newUserDetails.email;
        }
        if (newUserDetails?.name) {
          user.name = newUserDetails.name;
        }
        if (newUserDetails?.gender) {
          user.gender = newUserDetails.gender;
        }
        if (newUserDetails?.isMarried) {
          user.isMarried = newUserDetails.isMarried;
        }
      }
      return user;
    });

    return user;
  }
}

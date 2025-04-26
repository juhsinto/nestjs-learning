import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { User } from './types';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  users: User[] = [
    {
      id: 1,
      name: 'John',
      email: 'john@gmail.com',
      // age: 28,
      gender: 'male',
      isMarried: false,
      password: 'fatcat32',
    },
    {
      id: 2,
      name: 'fgfd',
      email: 'gffd@gmail.com',
      // age: 34,
      gender: 'fa',
      isMarried: true,
      password: 'fatcat32',
    },
  ];

  getAllUsers() {
    if (this.authService.isAuthenticated) {
      return this.users;
    } else {
      return 'You are not logged in';
    }
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
    console.log('jm: trying to update with ', newUserDetails);
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

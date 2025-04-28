import { Injectable } from '@nestjs/common';
// import { User } from './types';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserDto } from 'src/dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // users: User[] = [
  //   {
  //     id: 1,
  //     firstName: 'John',
  //     lastName: 'Doe',
  //     email: 'john@gmail.com',
  //     // age: 28,
  //     gender: 'male',
  //     isMarried: false,
  //     password: 'fatcat32',
  //   },
  //   {
  //     id: 2,
  //     firstName: 'fgfd',
  //     lastName: 'dfgdf',
  //     email: 'gffd@gmail.com',
  //     // age: 34,
  //     gender: 'fa',
  //     isMarried: true,
  //     password: 'fatcat32',
  //   },
  // ];

  // getAllUsers() {
  //   if (this.authService.isAuthenticated) {
  //     return this.users;
  //   } else {
  //     return 'You are not logged in';
  //   }
  // }

  // getUserById(id: number) {
  //   const user = this.users.find((x) => x.id === id);
  //   return user ?? 'No user found';
  // }

  // createUser(user: User) {
  //   if (this.users.find((x) => x.id === user.id)) {
  //     throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
  //   }
  //   this.users.push(user);
  // }

  // getUsersIsMarried(isMarried: boolean) {
  //   const user = this.users.find((x) => x.isMarried === isMarried);
  //   return user;
  // }

  // updateUser(newUserDetails: Partial<User>) {
  //   console.log('jm: trying to update with ', newUserDetails);
  //   const user = this.users.find((user) => {
  //     if (user.id === newUserDetails.id) {
  //       if (newUserDetails?.email) {
  //         user.email = newUserDetails.email;
  //       }
  //       if (newUserDetails?.firstName) {
  //         user.firstName = newUserDetails.firstName;
  //       }
  //       if (newUserDetails?.lastName) {
  //         user.lastName = newUserDetails.lastName;
  //       }
  //       if (newUserDetails?.gender) {
  //         user.gender = newUserDetails.gender;
  //       }
  //       if (newUserDetails?.isMarried) {
  //         user.isMarried = newUserDetails.isMarried;
  //       }
  //     }
  //     return user;
  //   });

  //   return user;
  // }

  getAllUsers() {
    return this.userRepository.find();
  }

  public async createUser(userDto: CreateUserDto) {
    //validate user with given email - no duplicate
    const user = await this.userRepository.findOne({
      where: { email: userDto.email },
    });

    // handle error
    if (user) {
      return 'The user with given email already exists';
    }

    // create/insert user
    let newUser = this.userRepository.create(userDto);
    newUser = await this.userRepository.save(newUser);
    return newUser;
  }
}

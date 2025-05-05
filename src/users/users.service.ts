import {
  // BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
// import { User } from './types';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { ConfigService } from '@nestjs/config';
import { UserAlreadyExistsException } from 'src/CustomExceptions/user-already-exists.exception';
import { PaginationProvider } from 'src/common/pagination/pagination-provider';
import { PaginationQueryDto } from 'src/common/pagination/dto/pagination-query.dto';
import { Paginated } from 'src/common/pagination/paginated.interface';
// import { ConfigService } from '@nestjs/config';
// import { Profile } from 'src/profile/profile.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    // @InjectRepository(Profile)
    // private profileRepository: Repository<Profile>,
    private readonly configService: ConfigService,

    private readonly paginationProvider: PaginationProvider,
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

  public async getAllUsers(
    pageQueryDto: PaginationQueryDto,
  ): Promise<Paginated<User>> {
    try {
      // return await this.userRepository.find({
      //   relations: {
      //     profile: true,
      //   },
      // });
      return await this.paginationProvider.paginateQuery(
        pageQueryDto,
        this.userRepository,
        undefined,
        ['profile'],
      );
    } catch {
      throw new RequestTimeoutException(
        'An error has occured. try again later',
        { description: 'There was a problem fetching from the db ' },
      );
    }
  }

  public async createUser(userDto: CreateUserDto) {
    //validate user with given email - no duplicate
    // const user = await this.userRepository.findOne({
    //   where: { email: userDto.email },
    // });

    // // handle error
    // if (user) {
    //   return 'The user with given email already exists';
    // }

    // // create/insert user
    // let newUser = this.userRepository.create(userDto);
    // newUser = await this.userRepository.save(newUser);
    // return newUser;

    try {
      // create a profile
      userDto.profile = userDto.profile ?? {};
      // const profile = this.profileRepository.create(userDto.profile);
      // await this.profileRepository.save(profile);

      // check if the user with same username / email already exists
      const existingUserWithUsername = await this.userRepository.findOne({
        where: [{ username: userDto.username }],
      });
      if (existingUserWithUsername) {
        throw new UserAlreadyExistsException('username', userDto.username);
      }

      const existingUserWithEmail = await this.userRepository.findOne({
        where: [{ email: userDto.email }],
      });
      if (existingUserWithEmail) {
        throw new UserAlreadyExistsException('email', userDto.email);
      }

      // create a user obj
      const user = this.userRepository.create(userDto);
      // console.log('jm: creating a user ', user);
      // set the profile
      // user.profile = profile;

      // save the user
      const response = await this.userRepository.save(user);
      console.log('jm: trying to create a user: ', response);
      return response;
    } catch (error) {
      if (error instanceof Error && 'code' in error && 'detail' in error) {
        if (error?.code && error?.code === 'ECONNREFUSED') {
          throw new RequestTimeoutException(
            'An error has occured. try again later',
            { description: 'There was a problem fetching from the db ' },
          );
        }
        // if (error.code === '23505') {
        //   throw new BadRequestException(
        //     'there is some duplicate value for the user in the db',
        //     { description: error.detail as string },
        //   );
        // }
      } else {
        console.log("'jm: error', error);");
        throw error;
      }
    }
  }

  public async deleteUser(id: number) {
    //find user with given id
    // const user = await this.userRepository.findOneBy({ id });

    // delete user
    await this.userRepository.delete(id);

    // delete profile if exists
    // if (user?.profile?.id) {
    //   await this.profileRepository.delete(user.profile.id);
    // }

    // send response
    return { deleted: true };
  }

  public async findUserById(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `User with id ${id} was not found`,
          table: 'user',
        },
        HttpStatus.NOT_FOUND,
        {
          description: `the exception occurred because a user with id ${id} was not found`,
        },
      );
    }
    return user;
  }
}

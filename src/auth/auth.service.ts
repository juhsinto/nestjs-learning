import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import authConfig from './config/auth.config';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { HashingProvider } from './provider/hashing.provider';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,

    @Inject(authConfig.KEY)
    private readonly authConfiguration: ConfigType<typeof authConfig>,

    private readonly hashingProvider: HashingProvider,
  ) {}

  isAuthenticated: boolean = false;

  public async login(loginDto: LoginDto) {
    // find user with username
    const user = await this.userService.findUserByUsername(loginDto.username);
    // if user availble compare the password
    let isEqual: boolean = false;
    isEqual = await this.hashingProvider.comparePassword(
      loginDto.password,
      user.password,
    );
    if (!isEqual) {
      throw new UnauthorizedException('Invalid credentials');
    } else {
      // if pasword match login success ; return token
      return {
        data: user,
        success: true,
        message: 'user logged in successfully',
      };
    }

    // send response;
    return user;
  }

  public async signup(createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
    // console.log('jm: attempting to signup');
    // console.log('jm: email', email);
  }
}

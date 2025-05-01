import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import authConfig from './config/auth.config';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,

    @Inject(authConfig.KEY)
    private readonly authConfiguration: ConfigType<typeof authConfig>,
  ) {}

  isAuthenticated: boolean = false;

  login(email: string, password: string) {
    console.log('jm: auth config', this.authConfiguration);
    console.log('jm: attempting to login');
    console.log('jm: email', email);
    console.log('jm: password', password);
    // const user = this.userService.users.find(
    //   (u) => u.email === email && u.password === password,
    // );
    // if (user) {
    //   this.isAuthenticated = true;
    //   return 'MY_TOKEN';
    // }
    return 'User does not exist or credentials incorrect';
  }
}

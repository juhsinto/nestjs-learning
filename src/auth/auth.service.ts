import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
  ) {}

  isAuthenticated: boolean = false;

  login(email: string, password: string) {
    console.log('jm: attempting to login');
    const user = this.userService.users.find(
      (u) => u.email === email && u.password === password,
    );
    if (user) {
      return 'MY_TOKEN';
    }
    return 'User does not exist or credentials incorrect';
  }
}

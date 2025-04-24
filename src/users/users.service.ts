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
    this.users.push(user);
  }

  getUsersIsMarried(isMarried: boolean) {
    return this.users.find((x) => x.isMarried === isMarried);
  }
}

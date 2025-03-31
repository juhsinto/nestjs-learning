import { User } from './types';

export class UsersService {
  users: User[] = [
    { id: 1, name: 'John', age: 28, gender: 'male', isMarried: false },
    { id: 2, name: 'fgfd', age: 34, gender: 'fa', isMarried: true },
  ];

  getAllUsers() {
    return this.users;
  }

  getUserById(id: number) {
    return this.users.find((x) => x.id === id);
  }

  createUser(user: User) {
    this.users.push(user);
  }
}

import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TweetService {
  constructor(private readonly userService: UsersService) {}

  tweets: { text: string; date: Date; userId: number }[] = [
    { text: 'some tweet', date: new Date('2024-11-12'), userId: 1 },
    { text: 'some other', date: new Date('2024-11-12'), userId: 2 },
    { text: 'some new tweet', date: new Date('2024-11-12'), userId: 12 },
  ];

  getTweets(userId: number) {
    const user = this.userService.getUserById(userId);

    if (user === 'No user found') {
      return 'No user found';
    } else {
      const tweets = this.tweets.filter((t) => t.userId === userId);
      const response = tweets.map((t) => {
        return { text: t.text, date: t.date, name: user.firstName };
      });
      return response;
    }
  }
}

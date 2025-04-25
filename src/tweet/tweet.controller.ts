import { Controller } from '@nestjs/common';
import { TweetService } from './tweet.service';

// req to /tweet

@Controller('tweet')
export class TweetController {
  constructor(private tweetService: TweetService) {}
}

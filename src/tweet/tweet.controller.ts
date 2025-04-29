import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { TweetService } from './tweet.service';
import { CreateTweetDTO } from './dto/create-tweet.dto';

// req to /tweet

@Controller('tweet')
export class TweetController {
  constructor(private tweetService: TweetService) {}

  @Get(':userid')
  public GetTweets(@Param('userid', ParseIntPipe) userid: number) {
    return this.tweetService.getTweets(userid);
  }

  @Post()
  public CreateTweet(@Body() tweet: CreateTweetDTO) {
    return this.tweetService.createTweet(tweet);
  }
}

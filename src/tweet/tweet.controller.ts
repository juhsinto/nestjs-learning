import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { TweetService } from './tweet.service';
import { CreateTweetDTO } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';

// req to /tweet

@Controller('tweet')
export class TweetController {
  constructor(private tweetService: TweetService) {}

  @Get()
  public GetAllTweets() {
    return this.tweetService.getAllTweets();
  }

  @Get(':userid')
  public GetTweets(@Param('userid', ParseIntPipe) userid: number) {
    return this.tweetService.getTweets(userid);
  }

  @Post()
  public CreateTweet(@Body() tweet: CreateTweetDTO) {
    return this.tweetService.createTweet(tweet);
  }

  @Patch()
  public UpdateTweet(@Body() tweet: UpdateTweetDto) {
    return this.tweetService.updateTweet(tweet);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TweetService } from './tweet.service';
import { CreateTweetDTO } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { PaginationQueryDto } from 'src/common/pagination/dto/pagination-query.dto';
import { GetTweetQueryDto } from './dto/get-tweet-query.dto';

// req to /tweet

@Controller('tweet')
export class TweetController {
  constructor(private tweetService: TweetService) {}

  @Get()
  public GetAllTweets() {
    return this.tweetService.getAllTweets();
  }

  @Get(':userid')
  public GetTweets(
    @Param('userid', ParseIntPipe) userid: number,
    @Query() getTweetQueryDto: GetTweetQueryDto,
  ) {
    console.log(getTweetQueryDto);
    // return this.tweetService.getTweets(userid, getTweetQueryDto);
  }

  @Post()
  public CreateTweet(@Body() tweet: CreateTweetDTO) {
    return this.tweetService.createTweet(tweet);
  }

  @Patch()
  public UpdateTweet(@Body() tweet: UpdateTweetDto) {
    return this.tweetService.updateTweet(tweet);
  }

  @Delete(':tweetid')
  public DeleteTweet(@Param('tweetid', ParseIntPipe) tweetid: number) {
    return this.tweetService.deleteTweet(tweetid);
  }
}

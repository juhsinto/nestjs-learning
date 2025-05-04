import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Tweet } from './tweet.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTweetDTO } from './dto/create-tweet.dto';
import { HashtagService } from 'src/hashtag/hashtag.service';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { PaginationQueryDto } from 'src/common/pagination/dto/pagination-query.dto';
import { PaginationProvider } from 'src/common/pagination/pagination-provider';

@Injectable()
export class TweetService {
  constructor(
    private readonly userService: UsersService,
    private readonly hashtagService: HashtagService,
    @InjectRepository(Tweet)
    private readonly tweetRepository: Repository<Tweet>,
    private readonly paginationProvider: PaginationProvider,
  ) {}

  // tweets: { text: string; date: Date; userId: number }[] = [
  //   { text: 'some tweet', date: new Date('2024-11-12'), userId: 1 },
  //   { text: 'some other', date: new Date('2024-11-12'), userId: 2 },
  //   { text: 'some new tweet', date: new Date('2024-11-12'), userId: 12 },
  // ];

  public async getAllTweets() {
    return await this.tweetRepository.find();
  }

  public async getTweets(userId: number, pageQueryDto: PaginationQueryDto) {
    // first find user in the user table
    const user = await this.userService.findUserById(userId);
    if (!user) {
      throw new NotFoundException(`User with userId ${userId} not found`);
    }

    return await this.paginationProvider.paginateQuery(
      pageQueryDto,
      this.tweetRepository,
      { user: { id: userId } },
    );

    // const user = this.userService.getUserById(userId);
    // if (user === 'No user found') {
    //   return 'No user found';
    // } else {
    //   const tweets = this.tweets.filter((t) => t.userId === userId);
    //   const response = tweets.map((t) => {
    //     return { text: t.text, date: t.date, name: user.firstName };
    //   });
    //   return response;
    // }
  }

  public async createTweet(createTweetDto: CreateTweetDTO) {
    // find user with given userid from user table
    const user = await this.userService.findUserById(createTweetDto.userId);

    if (user) {
      const hashtags = await this.hashtagService.findHashtags(
        createTweetDto.hashtags,
      );
      // create a tweet
      const tweet = this.tweetRepository.create({
        ...createTweetDto,
        user,
        hashtags,
      });

      // save the tweet
      return await this.tweetRepository.save(tweet);
    }
  }

  // update hashtags of the tweet
  public async updateTweet(updateTweetDto: UpdateTweetDto) {
    // find all the hashtags
    const hashtags = await this.hashtagService.findHashtags(
      updateTweetDto.hashtags!,
    );

    // find tweet by id
    const tweet = await this.tweetRepository.findOneBy({
      id: updateTweetDto.id,
    });

    // update prop of the tweet
    if (tweet) {
      tweet.text = updateTweetDto.text ?? tweet.text;
      tweet.image = updateTweetDto.image ?? tweet.image;
      tweet.hashtags = hashtags;

      return await this.tweetRepository.save(tweet);
    }

    // if can't find tweet by id
    return null;
  }

  public async deleteTweet(id: number) {
    await this.tweetRepository.delete({
      id,
    });

    return { deleted: true, id };
  }
}

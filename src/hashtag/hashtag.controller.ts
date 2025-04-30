import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateHashtagDTO } from './dto/CreateHashtag.dto';
import { HashtagService } from './hashtag.service';

@Controller('hashtag')
export class HashtagController {
  constructor(private readonly hashtagService: HashtagService) {}

  @Post()
  public createNewHashtag(@Body() CreateHashtagDTO: CreateHashtagDTO) {
    return this.hashtagService.createHashtag(CreateHashtagDTO);
  }

  @Delete(':hashtagId')
  public DeleteHashtag(@Param('hashtagId', ParseIntPipe) hashtagId: number) {
    return this.hashtagService.deleteHashtag(hashtagId);
  }
}

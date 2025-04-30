import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Hashtag } from './hashtag.entity';
import { CreateHashtagDTO } from './dto/CreateHashtag.dto';

@Injectable()
export class HashtagService {
  constructor(
    @InjectRepository(Hashtag)
    private readonly hashtagRepository: Repository<Hashtag>,
  ) {}

  public async createHashtag(CreateHashtagDTO: CreateHashtagDTO) {
    const hashtag = this.hashtagRepository.create(CreateHashtagDTO);

    return await this.hashtagRepository.save(hashtag);
  }

  public async getAllHashtags() {
    return await this.hashtagRepository.find({});
  }

  public async findHashtags(hashtags: number[]) {
    return await this.hashtagRepository.find({
      where: { id: In(hashtags) },
    });
  }

  // public async deleteHashtag(id: number) {
  //   await this.hashtagRepository.delete({
  //     id,
  //   });

  //   return { deleted: true, id };
  // }

  public async softDeleteHashtag(id: number) {
    await this.hashtagRepository.softDelete({
      id,
    });

    return { deleted: true, id };
  }
}

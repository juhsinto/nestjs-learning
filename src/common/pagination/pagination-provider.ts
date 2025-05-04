import { Injectable } from '@nestjs/common';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import {
  FindManyOptions,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
} from 'typeorm';

@Injectable()
export class PaginationProvider {
  public async paginateQuery<T extends ObjectLiteral>(
    paginationQueryDto: PaginationQueryDto,
    repository: Repository<T>,
    where?: FindOptionsWhere<T>,
  ) {
    const findOptions: FindManyOptions<T> = {
      skip:
        paginationQueryDto.page && paginationQueryDto.limit
          ? (paginationQueryDto?.page - 1) * paginationQueryDto?.limit
          : 0,
      take: paginationQueryDto.limit,
    };
    if (where) {
      findOptions.where = where;
    }
    return await repository.find(findOptions);
  }
}

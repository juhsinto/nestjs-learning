import { Injectable } from '@nestjs/common';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { FindOptionsWhere, ObjectLiteral, Repository } from 'typeorm';

@Injectable()
export class PaginationProvider {
  public async paginateQuery<T extends ObjectLiteral>(
    paginationQueryDto: PaginationQueryDto,
    repository: Repository<T>,
    where?: FindOptionsWhere<T>,
  ) {
    return await repository.find({
      skip:
        paginationQueryDto.page && paginationQueryDto.limit
          ? (paginationQueryDto?.page - 1) * paginationQueryDto?.limit
          : 0,
      take: paginationQueryDto.limit,
    });
  }
}

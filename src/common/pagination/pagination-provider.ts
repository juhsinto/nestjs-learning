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

    const result = await repository.find(findOptions);
    const totalItems = await repository.count();
    const totalPages = paginationQueryDto.limit
      ? Math.ceil(totalItems / paginationQueryDto.limit)
      : 0;

    const currentPage = paginationQueryDto.page;
    const nextPage =
      currentPage === totalPages ? currentPage : currentPage && currentPage + 1;
    const previousPage =
      currentPage === 1 ? currentPage : currentPage && currentPage - 1;
    // const firstPage = 'firstPage';
    // const lastPage = 'lastPage';

    const response = {
      data: result,
      meta: {
        itemsPerPage: paginationQueryDto.limit,
        totalItems: totalItems,
        currentPage: paginationQueryDto.page,
        totalPages: totalPages,
      },
      links: { nextPage, previousPage },
    };

    return response;
  }
}

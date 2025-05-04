import { Injectable, Inject } from '@nestjs/common';

import { PaginationQueryDto } from './dto/pagination-query.dto';
import {
  FindManyOptions,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
} from 'typeorm';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { Paginated } from './paginated.interface';

@Injectable()
export class PaginationProvider {
  constructor(@Inject(REQUEST) private readonly request: Request) {}
  public async paginateQuery<T extends ObjectLiteral>(
    paginationQueryDto: PaginationQueryDto,
    repository: Repository<T>,
    where?: FindOptionsWhere<T>,
    relations?: string[],
  ): Promise<Paginated<T>> {
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
    if (relations) {
      findOptions.relations = relations;
    }

    const result = await repository.find(findOptions);
    const totalItems = await repository.count();
    const totalPages = paginationQueryDto.limit
      ? Math.ceil(totalItems / paginationQueryDto.limit)
      : 0;

    const currentPage = paginationQueryDto.page;
    const nextPage =
      currentPage === totalPages ? currentPage : currentPage && currentPage + 1;
    const prevPage =
      currentPage === 1 ? currentPage : currentPage && currentPage - 1;

    const baseUrl =
      this.request.protocol + '://' + this.request.headers.host + '/';
    const newUrl = new URL(this.request.url, baseUrl);

    const response: Paginated<T> = {
      data: result,
      meta: {
        itemsPerPage: paginationQueryDto.limit!,
        totalItems: totalItems,
        currentPage: paginationQueryDto.page!,
        totalPages: totalPages,
      },
      links: {
        first: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQueryDto.limit}&page=1`,
        last: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQueryDto.limit}&page=${totalPages}`,
        currentPage: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQueryDto.limit}&page=${currentPage}`,
        next: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQueryDto.limit}&page=${nextPage}`,
        previous: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQueryDto.limit}&page=${prevPage}`,
      },
    };

    return response;
  }
}

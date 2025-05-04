// import { Type } from 'class-transformer';
// no need to type transformer because of the implicit conversion in main.ts
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  //   @Type(() => Number)
  // 10 is the default number
  limit?: number = 10;

  @IsOptional()
  @IsPositive()
  //   @Type(() => Number)
  page?: number = 1;
}

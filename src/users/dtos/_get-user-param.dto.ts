import { Type } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

// unused; TODO: find out how to use this
export class GetUserParamDto {
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  married: boolean;
}

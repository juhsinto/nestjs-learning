import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsInt,
  IsArray,
} from 'class-validator';

export class CreateTweetDTO {
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsOptional()
  image?: string;

  @IsNotEmpty()
  @IsInt()
  userId: number;

  @IsOptional()
  // each element in array will be an integer
  @IsInt({ each: true })
  @IsArray()
  hashtags: number[];
}

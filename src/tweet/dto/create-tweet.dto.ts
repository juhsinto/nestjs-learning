import { IsNotEmpty, IsString, IsOptional, IsInt } from 'class-validator';

export class CreateTweetDTO {
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsOptional()
  image?: string;

  @IsNotEmpty()
  @IsInt()
  userId: number;
}

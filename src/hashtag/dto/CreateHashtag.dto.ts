import { IsNotEmpty, IsString } from 'class-validator';

export class CreateHashtagDTO {
  @IsNotEmpty()
  @IsString()
  name: string;
}

import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNumber()
  id: number;

  @IsString({ message: 'name should be a string value' })
  @IsNotEmpty()
  @MinLength(3, { message: 'name should be at least 3 characters long' })
  name: string;

  @IsEmail()
  email: string;

  @IsNumber()
  @IsOptional()
  age: number;

  @IsOptional()
  gender?: string;
  @IsOptional()
  isMarried: boolean;
}

import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNumber()
  id: number;

  @IsOptional()
  isMarried?: boolean;

  @IsString({ message: 'first name should be a string value' })
  @IsNotEmpty()
  @MaxLength(100)
  @MinLength(3, { message: 'first name should have a minimum of 3 char' })
  firstName: string;

  @IsString({ message: 'last name should be a string value' })
  @IsNotEmpty()
  @MaxLength(100)
  @MinLength(3, { message: 'last name should have a minimum of 3 characters' })
  lastName: string;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  gender?: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(100)
  password: string;
}

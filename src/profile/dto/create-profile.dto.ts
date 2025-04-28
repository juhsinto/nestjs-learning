import {
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  IsDate,
  IsBoolean,
} from 'class-validator';

export class CreateProfileDto {
  //   @IsNumber()
  //   id: number;

  @IsOptional()
  @IsBoolean()
  isMarried?: boolean;

  @IsString({ message: 'first name should be a string value' })
  @MaxLength(100)
  @IsOptional()
  @MinLength(3, { message: 'first name should have a minimum of 3 char' })
  firstName?: string;

  @IsString({ message: 'last name should be a string value' })
  @MaxLength(100)
  @IsOptional()
  @MinLength(3, { message: 'last name should have a minimum of 3 characters' })
  lastName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(10)
  gender?: string;

  @IsOptional()
  @IsDate()
  dateOfBirth?: Date;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  profileImage?: string;
}

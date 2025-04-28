import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

// export class UpdateUserDto extends PartialType(
//   // remove id as a type ; because by default partial makes all props optional
//   OmitType(CreateUserDto, ['id'] as const),
// ) {
//   // Add the required id property
//   @IsNumber()
//   @IsNotEmpty()
//   id: number;
// }

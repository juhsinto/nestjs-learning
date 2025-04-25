import { Module } from '@nestjs/common';
import { UsersController } from './users.controllers';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}

import { Module } from '@nestjs/common';
import { UsersController } from './users.controllers';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
  // imports: [forwardRef(() => AuthModule)],
  imports: [TypeOrmModule.forFeature([User])],
})
export class UsersModule {}

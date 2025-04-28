import { Module } from '@nestjs/common';
import { UsersController } from './users.controllers';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from 'src/profile/profile.entity';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
  // imports: [forwardRef(() => AuthModule)],
  imports: [TypeOrmModule.forFeature([User, Profile])],
})
export class UsersModule {}

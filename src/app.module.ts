import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { TweetModule } from './tweet/tweet.module';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { HashtagModule } from './hashtag/hashtag.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    TweetModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [],
      useFactory: () => ({
        type: 'postgres',
        autoLoadEntities: true,
        // entities: [User],
        synchronize: true,
        host: 'localhost',
        port: 5432,
        username: 'admin',
        password: 'root',
        database: 'nestjs',
      }),
    }),
    ProfileModule,
    HashtagModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostEntity } from './post.entity';
import { UserModule } from '../user/user.module';
import { CommentModule } from '../comment/comment.module';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity]), UserModule, CommentModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}

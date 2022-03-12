import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentEntity } from './comment.entity';
import { PostEntity } from '../post/post.entity';
import { CommentDto } from './comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>,
  ) {}

  async getComments(post: PostEntity): Promise<CommentDto[]> {
    const comments = await this.commentRepository
      .createQueryBuilder('comment')
      .select()
      .leftJoinAndSelect('comment.author', 'user')
      .leftJoinAndSelect('comment.post', 'post')
      .where(`comment.postId = ${post.id}`)
      .limit(10)
      .getMany();

    return comments.map((entity) => {
      const { post, author, ...rest } = entity;

      return {
        ...rest,
        authorId: author.id,
        postId: post.id,
      };
    });
  }
}

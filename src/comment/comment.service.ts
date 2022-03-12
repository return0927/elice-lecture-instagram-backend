import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentEntity } from './comment.entity';
import { PostEntity } from '../post/post.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>,
  ) {}

  async getComments(post: PostEntity): Promise<CommentEntity[]> {
    return this.commentRepository
      .createQueryBuilder('comment')
      .select()
      .where(`comment.postId = ${post.id}`)
      .limit(10)
      .getMany();
  }
}

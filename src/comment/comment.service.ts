import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentEntity } from './comment.entity';
import { PostEntity } from '../post/post.entity';
import { CommentDto } from './comment.dto';
import { CreateCommentDto } from './create-comment.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>,

    private userService: UserService,
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

  async getComment(id: number): Promise<CommentDto> {
    const comment = await this.commentRepository
      .createQueryBuilder('comment')
      .select()
      .leftJoinAndSelect('comment.author', 'user')
      .leftJoinAndSelect('comment.post', 'post')
      .where({ id })
      .getOne();

    if (!comment) throw new NotFoundException();

    const { post, author, ...rest } = comment;

    return {
      ...rest,
      authorId: author.id,
      postId: post.id,
    };
  }

  async createComment(
    post: PostEntity,
    dto: CreateCommentDto,
  ): Promise<CommentDto> {
    const createdComment = await (async () => {
      const { authorId, ...rest } = dto;
      const author = await this.userService.getById(authorId);
      return this.commentRepository.save({
        ...rest,
        author,
        post,
      });
    })();

    return (async () => {
      const { post, author, ...rest } = createdComment;
      return {
        ...rest,
        authorId: author.id,
        postId: post.id,
      };
    })();
  }
}

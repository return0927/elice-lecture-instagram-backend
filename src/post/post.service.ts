import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Express } from 'express';
import { GetPostDto } from './get-post.dto';
import { PostEntity } from './post.entity';
import { NewPostDto } from './new-post.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
    private userService: UserService,
  ) {}

  async getAllPosts(): Promise<GetPostDto[]> {
    const posts = await this.postRepository.find();

    return posts.map((v) => {
      const { attachment, ...resources } = v;
      return resources;
    });
  }

  async getPost(id: number): Promise<GetPostDto> {
    const post = await this.postRepository.findOne({ id });
    if (!post) throw new NotFoundException();

    const { attachment, ...resources } = post;
    return resources;
  }

  async getAttachment(id: number): Promise<Buffer> {
    const post = await this.postRepository.findOne({ id });
    if (!post) throw new NotFoundException();
    const { attachment } = post;
    return attachment;
  }

  async createPost(
    dto: NewPostDto,
    file: Express.Multer.File,
  ): Promise<GetPostDto> {
    // const user = await this.userService.getById(dto.authorId);
    // console.dir(user);
    // if (!user) {
    //   throw new NotFoundException(`Cannot find user with id ${dto.authorId}`);
    // }

    const savingPost = {
      ...dto,
      attachment: Buffer.from(file.buffer),
    };
    const newPost = await this.postRepository.save(savingPost);
    const { attachment, ...detached } = newPost;

    return detached;
  }
}

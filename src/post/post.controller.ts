import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express, Response } from 'express';
import { Readable } from 'stream';
import { GetPostDto } from './get-post.dto';
import { PostService } from './post.service';
import { CommentService } from '../comment/comment.service';
import { CreateCommentDto } from '../comment/create-comment.dto';
import { CommentDto } from '../comment/comment.dto';

@Controller('post')
@ApiTags('post')
export class PostController {
  constructor(
    private postService: PostService,
    private commentService: CommentService,
  ) {}

  @Get('/')
  getAllPosts(): Promise<GetPostDto[]> {
    return this.postService.getAllPosts();
  }

  @Get('/:id')
  @ApiNotFoundResponse({
    description: '게시글이 존재하지 않는 경우',
  })
  getPost(@Param('id') id: number): Promise<GetPostDto> {
    return this.postService.getPost(id);
  }

  @Post('/')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('attachment'))
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        content: {
          type: 'string',
          description: '게시글 내용',
        },
        authorId: {
          type: 'number',
          description: '작성자 ID',
        },
        attachment: {
          type: 'string',
          format: 'binary',
          description: '업로드할 파일',
        },
      },
    },
  })
  createPost(
    @Body() body,
    @UploadedFile() attachment: Express.Multer.File,
  ): Promise<GetPostDto> {
    return this.postService.createPost(body, attachment);
  }

  @Get('/:id/attachment')
  @ApiNotFoundResponse({
    description: '게시글이 존재하지 않는 경우',
  })
  async getAttachment(@Param('id') id: number, @Res() res: Response) {
    const attachment = await this.postService.getAttachment(id);

    const stream = new Readable();
    stream.push(attachment);
    stream.push(null);

    res.set({
      'Content-Type': 'image/jpeg',
      'Content-Length': attachment.length,
    });
    stream.pipe(res);
  }

  @ApiTags('comment')
  @Get('/:id/comment')
  @ApiNotFoundResponse({
    description: '게시글이 존재하지 않는 경우',
  })
  async getComments(@Param('id') id: number) {
    const post = await this.postService.getPostRaw(id);
    return this.commentService.getComments(post);
  }

  @ApiTags('comment')
  @Post('/:id/comment')
  @ApiNotFoundResponse({
    description: '게시글 혹은 작성자가 존재하지 않는 경우',
  })
  @ApiCreatedResponse({
    description: '생성된 댓글 객체',
    type: CommentDto,
  })
  async createComment(
    @Param('id') id: number,
    @Body() body: CreateCommentDto,
    @Res() res: Response,
  ): Promise<CommentDto> {
    const post = await this.postService.getPostRaw(id);
    return this.commentService.createComment(post, body);
  }
}

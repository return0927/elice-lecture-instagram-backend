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
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express, Response } from 'express';
import { Readable } from 'stream';
import { GetPostDto } from './get-post.dto';
import { PostService } from './post.service';
import { NewPostDto } from './new-post.dto';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get('/')
  getAllPosts(): Promise<GetPostDto[]> {
    return this.postService.getAllPosts();
  }

  @Get('/:id')
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
        authorName: {
          type: 'string',
          description: '작성자 이름',
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
}

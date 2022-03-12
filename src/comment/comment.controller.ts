import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommentDto } from './comment.dto';
import { CommentService } from './comment.service';

@Controller('comment')
@ApiTags('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get('/:id')
  getComment(@Param('id') id: number): Promise<CommentDto> {
    return this.commentService.getComment(id);
  }
}

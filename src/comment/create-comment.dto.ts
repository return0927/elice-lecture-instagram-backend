import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    description: '댓글 내용',
    example: '진짜 맛있겠다..',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 1024)
  comment!: string;

  @ApiProperty({
    description: '작성자 ID',
    example: 1,
  })
  @IsNumber()
  authorId: number;
}

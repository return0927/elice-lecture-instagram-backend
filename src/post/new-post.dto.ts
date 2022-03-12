import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class NewPostDto {
  @IsString()
  @IsNotEmpty()
  content!: string;

  attachment!: Buffer;

  @IsNumber()
  authorId: number;
}

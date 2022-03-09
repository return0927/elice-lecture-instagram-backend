import { IsNotEmpty, IsString } from 'class-validator';

export class NewPostDto {
  @IsString()
  @IsNotEmpty()
  content!: string;

  attachment!: Buffer;

  @IsString()
  @IsNotEmpty()
  authorName: string;
}

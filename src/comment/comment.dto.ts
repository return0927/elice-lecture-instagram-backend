export class CommentDto {
  id!: number;

  authorId!: number;

  postId!: number;

  comment!: string;

  createdAt!: Date;

  updatedAt!: Date;

  deletedAt?: Date;
}

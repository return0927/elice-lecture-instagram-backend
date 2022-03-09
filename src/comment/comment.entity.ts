import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { PostEntity } from '../post/post.entity';
import { UserEntity } from '../user/user.entity';

@Entity('comments')
export class CommentEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  @Length(1, 1024)
  comment!: string;

  @ManyToOne(() => PostEntity, (post) => post.comments)
  post!: PostEntity;

  @ManyToOne(() => UserEntity, (u) => u.comments)
  author!: UserEntity;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}

import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { UserEntity } from '../user/user.entity';
import { CommentEntity } from '../comment/comment.entity';

@Entity('posts')
export class PostEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  content!: string;

  @Column('longblob')
  attachment?: Buffer;

  @ManyToOne(() => UserEntity, (u) => u.posts)
  author!: UserEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.post)
  comments!: CommentEntity[];

  @CreateDateColumn()
  createdAt!: Date;
}

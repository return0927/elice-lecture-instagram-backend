import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsString } from 'class-validator';
import { UserEntity } from '../user/user.entity';

@Entity('posts')
export class PostEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column()
  @IsString()
  content!: string;

  @Column('longblob')
  attachment?: Buffer;

  // @ManyToOne(() => UserEntity, (u) => u.posts)
  // author!: UserEntity;

  @Column()
  authorName: string;

  @CreateDateColumn()
  createdAt!: Date;
}

import {
 Column, Entity, OneToMany, PrimaryGeneratedColumn
} from 'typeorm';
import { IsEmail, IsString } from 'class-validator';
import { PostEntity } from '../post/post.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Column({
    unique: true,
  })
  @IsString()
  loginId!: string;

  @Column()
  @IsString()
  name!: string;

  @Column()
  @IsEmail()
  email!: string;

  @Column('char', {
    length: 64,
  })
  password!: string;

  // @OneToMany(() => PostEntity, (p) => p.author)
  // posts!: PostEntity[];
}

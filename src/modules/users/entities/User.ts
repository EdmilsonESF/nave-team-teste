/* eslint-disable camelcase */
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Naver from '../../navers/entities/Naver';
import Project from '../../projects/entities/Project';

@Entity('users')
class User {
  @PrimaryGeneratedColumn()
  readonly user_id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @OneToMany(() => Naver, naver => naver.user)
  navers: Naver[];

  @OneToMany(() => Project, project => project.user)
  projects: Project[];

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;
}

export default User;

/* eslint-disable camelcase */
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Naver_project from '../../naver_project/entities/NaverProject';
import User from '../../users/entities/User';

@Entity('projects')
class Project {
  @PrimaryGeneratedColumn()
  readonly project_id: number;

  @Column()
  name: string;

  @Column()
  user_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Naver_project, naver_projects => naver_projects.project)
  @JoinColumn({ name: 'project_id' })
  naver_projects: Naver_project[];

  @CreateDateColumn()
  created_at: Date;
}

export default Project;

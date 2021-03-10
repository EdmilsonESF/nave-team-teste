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

@Entity('navers')
class Naver {
  @PrimaryGeneratedColumn()
  readonly naver_id: number;

  @Column()
  name: string;

  @Column()
  birthdate: Date;

  @Column()
  admission_date: Date;

  @Column()
  job_role: string;

  @Column()
  user_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Naver_project, naver_projects => naver_projects.naver)
  @JoinColumn({ name: 'naver_id' })
  naver_projects: Naver_project[];

  @CreateDateColumn()
  created_at: Date;
}

export default Naver;

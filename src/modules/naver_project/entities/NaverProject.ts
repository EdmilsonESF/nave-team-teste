/* eslint-disable camelcase */
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Naver from '../../navers/entities/Naver';
import Project from '../../projects/entities/Project';

@Entity('naver_project')
class Naver_project {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  naver_id: number;

  @Column()
  project_id: number;

  @ManyToOne(() => Naver, naver => naver.naver_projects, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'naver_id' })
  naver: Naver;

  @ManyToOne(() => Project, project => project.naver_projects, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'project_id' })
  project: Project;
}

export default Naver_project;

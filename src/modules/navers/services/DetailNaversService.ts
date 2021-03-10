/* eslint-disable camelcase */
import { getCustomRepository } from 'typeorm';
import { format } from 'date-fns';
import NaversRepository from '../repositories/NaversRepository';
import ProjectsRepository from '../../projects/repositories/ProjectsRepository';

interface project {
  project_id: number;
  name: string;
}

interface Resp {
  naver_id: number;
  name: string;
  birthdate: string;
  admission_date: string;
  job_role: string;
  projects: project[];
}

export default class DetailProjectService {
  public async execute(user_id: number, id: number): Promise<Resp | undefined> {
    const naversRepository = getCustomRepository(NaversRepository);
    const projectRepository = getCustomRepository(ProjectsRepository);

    const projects = await projectRepository
      .createQueryBuilder('projects')
      .select('projects.name')
      .addSelect('projects.project_id')
      .innerJoin('projects.naver_projects', 'naver_projects')
      .innerJoin('naver_projects.naver', 'naver')
      .where(`naver.naver_id = ${id}`)
      .getMany();

    const [dataNaver] = await naversRepository
      .createQueryBuilder('navers')
      .select([
        'navers.naver_id',
        'navers.name',
        'navers.birthdate',
        'navers.admission_date',
        'navers.job_role',
      ])
      .where({ user_id, naver_id: id })
      .getMany();

    if (!dataNaver) {
      throw new Error('Nenhum naver encontrado');
    }

    const naver = {
      ...dataNaver,
      birthdate: format(dataNaver.birthdate, 'MM-dd-yyyy'),
      admission_date: format(dataNaver.admission_date, 'MM-dd-yyyy'),
    };

    return {
      ...naver,
      projects,
    };
  }
}

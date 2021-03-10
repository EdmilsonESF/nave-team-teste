/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
import { getCustomRepository } from 'typeorm';
import { format } from 'date-fns';
import ProjectsRepository from '../repositories/ProjectsRepository';
import NaversRepository from '../../navers/repositories/NaversRepository';
import AppError from '../../../shared/errors/AppError';

interface NaversRes {
  naver_id: number;
  name: string;
  birthdate: string;
  admission_date: string;
  job_role: string;
}

interface Response {
  project_id: number;
  name: string;
  navers: NaversRes[];
}

export default class DetailProjectService {
  public async execute(
    user_id: number,
    id: number,
  ): Promise<Response | undefined> {
    const projectRepository = getCustomRepository(ProjectsRepository);
    const naverRepository = getCustomRepository(NaversRepository);

    const [project] = await projectRepository
      .createQueryBuilder('projects')
      .select(['projects.project_id', 'projects.name'])
      .where({ user_id, project_id: id })
      .getMany();

    if (!project) {
      throw new AppError('Nenhum projeto não encontrado');
    }

    const dataNavers = await naverRepository
      .createQueryBuilder('navers')
      .select([
        'navers.naver_id',
        'navers.name',
        'navers.birthdate',
        'navers.admission_date',
        'navers.job_role',
      ])
      .innerJoin('navers.naver_projects', 'naver_projects')
      .innerJoin('naver_projects.project', 'project')
      .where(`project.project_id = ${id}`)
      .getMany();

    const navers: any = [];

    dataNavers.forEach(async naver => {
      const naverFormatted = {
        ...naver,
        birthdate: format(naver.birthdate, 'MM-dd-yyyy'),
        admission_date: format(naver.admission_date, 'MM-dd-yyyy'),
      };

      navers.push(naverFormatted);
    });

    return {
      ...project,
      navers,
    };
  }
}

/* eslint-disable camelcase */
import { getCustomRepository } from 'typeorm';
import NaverProjectRepository from '../../naver_project/repositories/NaverProjectRepository';
import NaversRepository from '../repositories/NaversRepository';
import ProjectRepository from '../../projects/repositories/ProjectsRepository';
import Naver from '../entities/Naver';
import AppError from '../../../shared/errors/AppError';

interface Request {
  name: string;
  birthdate: string;
  admission_date: string;
  job_role: string;
  user_id: number;
  projects: number[];
}

interface Response {
  naver: Naver;
  projects: number[];
}

export default class CreateProjectService {
  public async execute({
    name,
    birthdate,
    admission_date,
    job_role,
    user_id,
    projects,
  }: Request): Promise<Response> {
    const naversRepository = getCustomRepository(NaversRepository);
    const naverProjectRepository = getCustomRepository(NaverProjectRepository);
    const projectRepository = getCustomRepository(ProjectRepository);

    const userProjectsId = await projectRepository
      .createQueryBuilder('projects')
      .select('projects.project_id', 'id')
      .where(`user_id = ${user_id}`)
      .getRawMany();

    const projectIds: number[] = [];
    const projectNotExistent: number[] = [];

    userProjectsId.forEach(id => {
      const [valueId]: number[] = Object.values(id);

      projectIds.push(valueId);
    });

    projects.forEach(project => {
      if (!projectIds.includes(project)) {
        projectNotExistent.push(project);
      }
    });

    if (projectNotExistent.length) {
      throw new AppError(`Projeto ${projectNotExistent} não encontrado`);
    }

    const naver = naversRepository.create({
      name,
      birthdate,
      admission_date,
      job_role,
      user_id,
    });

    await naversRepository.save(naver);

    const { naver_id } = naver;

    projects.forEach(async project => {
      const projectCreated = naverProjectRepository.create({
        naver_id,
        project_id: project,
      });
      await naverProjectRepository.save(projectCreated);
    });

    return { naver, projects };
  }
}

/* eslint-disable camelcase */
import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import NaverProjectRepository from '../../naver_project/repositories/NaverProjectRepository';
import NaversRepository from '../repositories/NaversRepository';
import ProjectRepository from '../../projects/repositories/ProjectsRepository';

interface Request {
  name: string;
  id: number;
  birthdate: string;
  admission_date: string;
  job_role: string;
  user_id: number;
  projects: number[];
}

interface Response {
  name: string;
  birthdate: string;
  admission_date: string;
  job_role: string;
  projects: number[];
}

export default class CreateProjectService {
  public async update({
    user_id,
    id,
    name,
    birthdate,
    admission_date,
    job_role,
    projects,
  }: Request): Promise<Response | undefined> {
    const naverRepository = getCustomRepository(NaversRepository);
    const naverProjectRepository = getCustomRepository(NaverProjectRepository);
    const projectRepository = getCustomRepository(ProjectRepository);

    const userProjectsId = await projectRepository
      .createQueryBuilder('projects')
      .select('projects.project_id', 'id')
      .where(`user_id = ${user_id}`)
      .getRawMany();

    const projectIds: number[] = [];
    const projectNotExistent: number[] = [];

    userProjectsId.forEach(Id => {
      const [valueId]: number[] = Object.values(Id);

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

    const naver = await naverRepository.findOne({
      where: {
        naver_id: id,
        user_id,
      },
    });

    if (!naver) {
      throw new AppError('Naver não encontrado');
    }

    await naverRepository
      .createQueryBuilder()
      .update('navers')
      .set({
        name,
        birthdate,
        admission_date,
        job_role,
      })
      .where({ naver_id: id })
      .execute();

    await naverProjectRepository
      .createQueryBuilder()
      .delete()
      .from('naver_project')
      .where(
        `naver_project.naver_id = ${id} AND project_id NOT IN (${projects})`,
      )
      .execute();

    projects.forEach(async project => {
      const naverProjectExists = await naverProjectRepository.findOne({
        where: { naver_id: id, project_id: project },
      });

      if (!naverProjectExists) {
        const projectCreated = naverProjectRepository.create({
          naver_id: id,
          project_id: project,
        });

        await naverProjectRepository.save(projectCreated);
      }
    });

    return {
      name,
      birthdate,
      admission_date,
      job_role,
      projects,
    };
  }
}

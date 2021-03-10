/* eslint-disable camelcase */
import { getCustomRepository } from 'typeorm';
import NaverProjectRepository from '../../naver_project/repositories/NaverProjectRepository';
import NaversRepository from '../repositories/NaversRepository';

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

    const naver = await naverRepository.findOne({
      where: {
        naver_id: id,
        user_id,
      },
    });

    if (!naver) {
      throw new Error('Naver não encontrado');
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

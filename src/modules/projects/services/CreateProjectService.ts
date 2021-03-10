/* eslint-disable camelcase */
import { getCustomRepository } from 'typeorm';
import ProjectsRepository from '../repositories/ProjectsRepository';
import NaverProjectRepository from '../../naver_project/repositories/NaverProjectRepository';
import NaverRepository from '../../navers/repositories/NaversRepository';
import AppError from '../../../shared/errors/AppError';

interface Request {
  name: string;
  navers: [];
  user_id: number;
}

interface Response {
  name: string;
  navers: [];
}

export default class CreateProjectService {
  public async execute({ name, navers, user_id }: Request): Promise<Response> {
    const projectRepository = getCustomRepository(ProjectsRepository);
    const naverProjectRepository = getCustomRepository(NaverProjectRepository);
    const naverRepository = getCustomRepository(NaverRepository);

    const userNaverId = await naverRepository
      .createQueryBuilder('navers')
      .select('navers.naver_id', 'id')
      .where(`user_id = ${user_id}`)
      .getRawMany();

    const naverIds: number[] = [];
    const naverNotExistent: number[] = [];

    userNaverId.forEach(id => {
      const [valueId]: number[] = Object.values(id);

      naverIds.push(valueId);
    });

    navers.forEach(naver => {
      if (!naverIds.includes(naver)) {
        naverNotExistent.push(naver);
      }
    });

    if (naverNotExistent.length) {
      throw new AppError(`Naver ${naverNotExistent} não encontrado`);
    }

    const project = projectRepository.create({
      name,
      user_id,
    });

    await projectRepository.save(project);

    const { project_id } = project;

    navers.forEach(async naver => {
      const Navers = naverProjectRepository.create({
        naver_id: naver,
        project_id,
      });
      await naverProjectRepository.save(Navers);
    });

    return { name, navers };
  }
}

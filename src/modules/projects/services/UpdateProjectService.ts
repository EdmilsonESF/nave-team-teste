/* eslint-disable camelcase */
import { getCustomRepository } from 'typeorm';
import ProjectsRepository from '../repositories/ProjectsRepository';
import NaverProjectsRepository from '../../naver_project/repositories/NaverProjectRepository';

interface UpdateRequest {
  user_id: number;
  id: string;
  name: string;
  navers: number[];
}

interface UpdateResponse {
  name: string;
  navers: number[];
}

export default class UpdateProjectService {
  public async execute({
    user_id,
    id,
    name,
    navers,
  }: UpdateRequest): Promise<UpdateResponse | undefined> {
    const projectRepository = getCustomRepository(ProjectsRepository);
    const naverProjectRepository = getCustomRepository(NaverProjectsRepository);

    const project = await projectRepository.findOne({
      where: {
        project_id: id,
        user_id,
      },
    });

    if (!project) {
      throw new Error('Projeto não encontrado');
    }

    await projectRepository
      .createQueryBuilder()
      .update('projects')
      .set({
        name,
      })
      .where({ project_id: id })
      .execute();

    await naverProjectRepository
      .createQueryBuilder()
      .delete()
      .from('naver_project')
      .where(`naver_project.project_id = ${id} AND naver_id NOT IN (${navers})`)
      .execute();

    navers.forEach(async naver => {
      const naverProjectExists = await naverProjectRepository.findOne({
        where: { project_id: id, naver_id: naver },
      });

      if (!naverProjectExists) {
        const projectCreated = naverProjectRepository.create({
          naver_id: naver,
          project_id: Number(id),
        });

        await naverProjectRepository.save(projectCreated);
      }
    });

    return { name, navers };
  }
}

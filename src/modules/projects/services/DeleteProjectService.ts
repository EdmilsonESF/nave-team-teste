/* eslint-disable camelcase */
import { getCustomRepository } from 'typeorm';
import ProjectsRepository from '../repositories/ProjectsRepository';

export default class DeleteProjectService {
  public async execute(user_id: number, id: number): Promise<void> {
    const projectRepository = getCustomRepository(ProjectsRepository);

    await projectRepository
      .createQueryBuilder()
      .delete()
      .from('projects')
      .where({ user_id, project_id: id })
      .execute();
  }
}

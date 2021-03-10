/* eslint-disable camelcase */
import { getCustomRepository } from 'typeorm';
import Project from '../entities/Project';
import ProjectsRepository from '../repositories/ProjectsRepository';

interface Request {
  name: string;
  user_id: number;
}

export default class ListProjectService {
  public async execute({
    name,
    user_id,
  }: Request): Promise<Project[] | undefined> {
    const projectRepository = getCustomRepository(ProjectsRepository);

    const projects = await projectRepository.findByName({ name, user_id });

    return projects;
  }
}

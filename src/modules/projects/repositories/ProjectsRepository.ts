/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
import { EntityRepository, getRepository, Repository } from 'typeorm';
import Project from '../entities/Project';

interface FindByNameRequest {
  name: string;
  user_id: number;
}
@EntityRepository(Project)
class UsersRepository extends Repository<Project> {
  public async findByName({
    name,
    user_id,
  }: FindByNameRequest): Promise<Project[] | undefined> {
    const projectRepository = getRepository(Project);

    const projects = await projectRepository.query(`
    select project_id, name
    from projects
    where
      (user_id = ${user_id}) and
      (name = '${name}' or ${name === 'undefined'} or ${name === ''})
  `);

    if (!projects.length) {
      throw new Error('Projeto não encontrado');
    }

    return projects;
  }
}

export default UsersRepository;

/* eslint-disable camelcase */
import { getCustomRepository } from 'typeorm';
import NaversRepository from '../repositories/NaversRepository';

export default class ListProjectService {
  public async execute(user_id: number, id: number): Promise<void> {
    const naversRepository = getCustomRepository(NaversRepository);

    await naversRepository
      .createQueryBuilder()
      .delete()
      .from('navers')
      .where({ user_id, naver_id: id })
      .execute();
  }
}

/* eslint-disable camelcase */
import { getCustomRepository } from 'typeorm';
import { format, subYears } from 'date-fns';
import NaversRepository from '../repositories/NaversRepository';
import Naver from '../entities/Naver';

interface Request {
  name: string;
  user_id: number;
  job_role: string;
  companyTime: number;
}

export default class ListProjectService {
  public async execute({
    user_id,
    name,
    job_role,
    companyTime,
  }: Request): Promise<Naver[] | Naver | undefined> {
    const naversRepository = getCustomRepository(NaversRepository);

    let time = null;

    if (companyTime) {
      time = format(subYears(new Date(), companyTime), 'yyyy-dd-MM');
    }

    const navers = await naversRepository.filterNavers({
      name,
      user_id,
      job_role,
      companyTime,
      time,
    });

    return navers;
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
import { EntityRepository, getRepository, Repository } from 'typeorm';
import Naver from '../entities/Naver';

interface Request {
  name: string;
  user_id: number;
  job_role: string;
  companyTime: number;
  time: any;
}
@EntityRepository(Naver)
class UsersRepository extends Repository<Naver> {
  public async filterNavers({
    name,
    user_id,
    job_role,
    time,
  }: Request): Promise<Naver | Naver[]> {
    const naversRepository = getRepository(Naver);

    const navers = await naversRepository.query(`
      select
        naver_id as id,
        name,
        strftime('%Y-%m-%d',birthdate) as birthdate,
        strftime('%Y-%m-%d',admission_date) as admission_date,
        job_role
      from navers
      where
        (user_id = ${user_id}) and
        (name = '${name}' or ${name === 'undefined'} or ${name === ''}) and
        (job_role = '${job_role}' or ${job_role === 'undefined'} or ${
      job_role === ''
    }) and
        (admission_date < '${time}' or ${time === 'null'} or ${time === ''})
    `);

    return navers;
  }
}

export default UsersRepository;

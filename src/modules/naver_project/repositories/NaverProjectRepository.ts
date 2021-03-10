import { EntityRepository, Repository } from 'typeorm';
import NaverProject from '../entities/NaverProject';

@EntityRepository(NaverProject)
class UsersRepository extends Repository<NaverProject> {}

export default UsersRepository;

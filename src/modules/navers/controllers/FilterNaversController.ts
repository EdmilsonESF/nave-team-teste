/* eslint-disable camelcase */
import { Request, Response } from 'express';
import FilterNaversService from '../services/FilterNaversService';

export default class ListProjectsController {
  public async filter(request: Request, response: Response): Promise<Response> {
    try {
      const { user_id } = request.user;
      const { name, job_role, companyTime } = request.query;

      const Naver = new FilterNaversService();

      const naver = await Naver.execute({
        user_id,
        name: String(name),
        job_role: String(job_role),
        companyTime: Number(companyTime),
      });

      return response.json(naver);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

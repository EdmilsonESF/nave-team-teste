/* eslint-disable camelcase */
import { Request, Response } from 'express';
import CreateNaversService from '../services/CreateNaversService';

export default class CreateNaversController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const {
        name,
        birthdate,
        admission_date,
        job_role,
        projects,
      } = request.body;

      const Naver = new CreateNaversService();

      const { user_id } = request.user;

      const naver = await Naver.execute({
        name,
        birthdate,
        admission_date,
        job_role,
        user_id,
        projects,
      });

      return response.json(naver);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

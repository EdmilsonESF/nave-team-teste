/* eslint-disable camelcase */
import { Request, Response } from 'express';
import UpdateNaversService from '../services/UpdateNaversService';

export default class CreateNaversController {
  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const {
        name,
        birthdate,
        admission_date,
        job_role,
        projects,
      } = request.body;
      const { id } = request.query;
      const { user_id } = request.user;

      const Naver = new UpdateNaversService();

      const naver = await Naver.update({
        name,
        birthdate,
        admission_date,
        job_role,
        user_id,
        id: Number(id),
        projects,
      });

      return response.json(naver);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

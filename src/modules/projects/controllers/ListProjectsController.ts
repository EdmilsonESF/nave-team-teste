/* eslint-disable camelcase */
import { Request, Response } from 'express';
import ListProjectsService from '../services/ListProjectsService';

export default class ListProjectsController {
  public async list(request: Request, response: Response): Promise<Response> {
    try {
      const { user_id } = request.user;
      const { name } = request.query;

      const listProject = new ListProjectsService();

      const naver = await listProject.execute({
        user_id,
        name: String(name),
      });

      return response.json(naver);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

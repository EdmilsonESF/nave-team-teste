/* eslint-disable camelcase */
import { Request, Response } from 'express';
import DeleteNaversService from '../services/DeleteNaversService';

export default class CreateNaversController {
  public async delete(request: Request, response: Response): Promise<Response> {
    try {
      const { user_id } = request.user;
      const { id } = request.query;

      const Naver = new DeleteNaversService();

      await Naver.execute(user_id, Number(id));

      return response.send();
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

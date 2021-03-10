/* eslint-disable camelcase */
import { Request, Response } from 'express';
import DetailNaversService from '../services/DetailNaversService';

export default class DetailNaversController {
  public async listDatail(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const { user_id } = request.user;
      const { id } = request.query;

      const Naver = new DetailNaversService();

      const naver = await Naver.execute(user_id, Number(id));

      return response.json(naver);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

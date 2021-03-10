import { Request, Response } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';

export default class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { email, password } = request.body;

      const authenticateUser = new AuthenticateUserService();

      const { token, user } = await authenticateUser.execute({
        email,
        password,
      });

      delete user.password;

      return response.json({ user, token });
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

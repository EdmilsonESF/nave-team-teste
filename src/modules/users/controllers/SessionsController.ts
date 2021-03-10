import { Request, Response } from 'express';
import * as yup from 'yup';
import AppError from '../../../shared/errors/AppError';
import AuthenticateUserService from '../services/AuthenticateUserService';

export default class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    try {
      const schema = yup.object().shape({
        email: yup
          .string()
          .email('Email inválido')
          .strict()
          .required('[email] obrigatório'),
        password: yup.string().required('[password] obrigatório'),
      });

      await schema.validate(request.body);
    } catch (err) {
      throw new AppError(err.message);
    }

    const authenticateUser = new AuthenticateUserService();

    const { token, user } = await authenticateUser.execute({
      email,
      password,
    });

    delete user.password;

    return response.json({ user, token });
  }
}

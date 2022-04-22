import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../services';

export default class AuthMiddleware {
  public static async verifyToken(
    req: Request,
    _res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const token = req.headers.authorization;

      const { email } = AuthService.verifyToken(token);
      req.tokenPayload = { email };

      next();
    } catch (error) {
      next(error);
    }
  }
}
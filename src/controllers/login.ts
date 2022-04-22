import { Request, Response, NextFunction } from 'express';
import { ILoginCredentials } from '../interfaces';
import { AuthService, LoginService } from '../services';

export default class LoginController {
  protected loginService: LoginService;

  constructor(loginService: LoginService) {
    this.loginService = loginService;
  }

  public async login(
    req: Request<unknown, { token: string }, ILoginCredentials>,
    res: Response<{ token: string }>,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email, password } = req.body;

      const tokenPayload = await this.loginService.validateCredentials({
        email,
        password,
      });

      const token = AuthService.generateToken(tokenPayload);

      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }
}

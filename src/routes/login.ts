import { NextFunction, Request, Response, Router } from 'express';
import prisma from '../../prisma';
import { LoginController } from '../controllers';
import { LoginService } from '../services';

export default class LoginRoute {
  protected loginController: LoginController;

  protected loginService: LoginService;

  public router: Router;

  constructor() {
    this.loginService = new LoginService(prisma);
    this.loginController = new LoginController(this.loginService);

    this.router = Router().post(
      '/',
      async (req: Request, res: Response, next: NextFunction) => {
        await this.loginController.login(req, res, next);
      }
    );
  }
}

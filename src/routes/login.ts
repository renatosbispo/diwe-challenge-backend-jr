import { NextFunction, Request, Response, Router } from 'express';
import prisma from '../../prisma';
import { LoginController } from '../controllers';
import { UserSchema } from '../schemas';
import { LoginService } from '../services';
import { RequestValidationMiddleware } from '../middlewares';

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
        await new RequestValidationMiddleware(
          UserSchema.email,
          req.body.email
        ).validate(req, res, next);
      },
      async (req: Request, res: Response, next: NextFunction) => {
        await new RequestValidationMiddleware(
          UserSchema.password,
          req.body.password
        ).validate(req, res, next);
      },
      async (req: Request, res: Response, next: NextFunction) => {
        await this.loginController.login(req, res, next);
      }
    );
  }
}

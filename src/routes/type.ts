import { NextFunction, Request, Response, Router } from 'express';
import prisma from '../../prisma';
import { TypeController } from '../controllers';
import { TypeService } from '../services';

export default class TypeRoute {
  protected typeController: TypeController;

  protected typeService: TypeService;

  public router: Router;

  constructor() {
    this.typeService = new TypeService(prisma);
    this.typeController = new TypeController(this.typeService);

    this.router = Router().get(
      '/',
      async (req: Request, res: Response, next: NextFunction) => {
        await this.typeController.getAll(req, res, next);
      }
    );
  }
}

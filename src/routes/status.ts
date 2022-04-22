import { NextFunction, Request, Response, Router } from 'express';
import prisma from '../../prisma';
import { StatusController } from '../controllers';
import { StatusService } from '../services';

export default class StatusRoute {
  protected statusController: StatusController;

  protected statusService: StatusService;

  public router: Router;

  constructor() {
    this.statusService = new StatusService(prisma);
    this.statusController = new StatusController(this.statusService);

    this.router = Router().get(
      '/',
      async (req: Request, res: Response, next: NextFunction) => {
        await this.statusController.getAll(req, res, next);
      }
    );
  }
}

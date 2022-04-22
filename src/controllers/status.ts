import { Status } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import { StatusService } from '../services';

export default class StatusController {
  protected statusService: StatusService;

  constructor(statusService: StatusService) {
    this.statusService = statusService;
  }

  public async getAll(
    _req: Request,
    res: Response<Status[]>,
    next: NextFunction
  ): Promise<void> {
    try {
      const status = await this.statusService.getAll();

      res.status(200).json(status);
    } catch (error) {
      next(error);
    }
  }
}

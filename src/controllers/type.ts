import { Type } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import { TypeService } from '../services';

export default class TypeController {
  protected typeService: TypeService;

  constructor(typeService: TypeService) {
    this.typeService = typeService;
  }

  public async getAll(
    _req: Request,
    res: Response<Type[]>,
    next: NextFunction
  ): Promise<void> {
    try {
      const types = await this.typeService.getAll();

      res.status(200).json(types);
    } catch (error) {
      next(error);
    }
  }
}

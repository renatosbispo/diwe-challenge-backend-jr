import { NextFunction, Request, Response, Router } from 'express';
import prisma from '../../prisma';
import { FinancialEntryController } from '../controllers';
import { FinancialEntryService } from '../services';

export default class FinancialEntryRoute {
  protected financialEntryController: FinancialEntryController;

  protected financialEntryService: FinancialEntryService;

  public router: Router;

  constructor() {
    this.financialEntryService = new FinancialEntryService(prisma);
    this.financialEntryController = new FinancialEntryController(
      this.financialEntryService
    );

    this.router = Router().post(
      '/',
      async (req: Request, res: Response, next: NextFunction) => {
        await this.financialEntryController.create(req, res, next);
      }
    );
  }
}

import { FinancialEntry } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import { FinancialEntryService } from '../services';

export default class FinancialEntryController {
  protected financialEntryService: FinancialEntryService;

  constructor(financialEntryService: FinancialEntryService) {
    this.financialEntryService = financialEntryService;
  }

  public async create(
    req: Request<
      unknown,
      FinancialEntry,
      Pick<FinancialEntry, 'amount' | 'description' | 'statusId' | 'typeId'>
    >,
    res: Response<FinancialEntry>,
    next: NextFunction
  ): Promise<void> {
    try {
      const { amount, description, statusId, typeId } = req.body;
      const { id } = req.tokenPayload;

      const financialEntry = await this.financialEntryService.create(id, {
        amount,
        description,
        statusId,
        typeId,
      });

      res.status(201).json(financialEntry);
    } catch (error) {
      next(error);
    }
  }
}

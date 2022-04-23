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

  public async delete(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id: userId } = req.tokenPayload;
      const { id: financialEntryId } = req.params;

      await this.financialEntryService.delete(financialEntryId, userId);

      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }

  public async getAll(
    req: Request<unknown, FinancialEntry[]>,
    res: Response<FinancialEntry[]>,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.tokenPayload;
      const financialEntries = await this.financialEntryService.getAll(id);

      res.status(200).json(financialEntries);
    } catch (error) {
      next(error);
    }
  }

  public async getOne(
    req: Request<{ id: string }, FinancialEntry | Record<string, never>>,
    res: Response<FinancialEntry | Record<string, never>>,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id: userId } = req.tokenPayload;
      const { id: financialEntryId } = req.params;

      const financialEntry = await this.financialEntryService.getOne(
        financialEntryId,
        userId
      );

      res.status(200).json(financialEntry || {});
    } catch (error) {
      next(error);
    }
  }

  public async update(
    req: Request<
      { id: string },
      FinancialEntry,
      Pick<Partial<FinancialEntry>, 'amount' | 'statusId'>
    >,
    res: Response<FinancialEntry>,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id: userId } = req.tokenPayload;
      const { id: financialEntryId } = req.params;
      const { amount, statusId } = req.body;

      const updatedFinancialEntry = await this.financialEntryService.update(
        financialEntryId,
        userId,
        { amount, statusId }
      );

      res.status(200).json(updatedFinancialEntry);
    } catch (error) {
      next(error);
    }
  }
}

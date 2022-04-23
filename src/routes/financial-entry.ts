import { FinancialEntry } from '@prisma/client';
import { NextFunction, Request, Response, Router } from 'express';
import prisma from '../../prisma';
import { FinancialEntryController } from '../controllers';
import { FinancialEntrySchema } from '../schemas';
import { FinancialEntryService } from '../services';
import { RequestValidationMiddleware } from '../middlewares';

export default class FinancialEntryRoute {
  protected financialEntryController: FinancialEntryController;

  protected financialEntryService: FinancialEntryService;

  public router: Router;

  constructor() {
    this.financialEntryService = new FinancialEntryService(prisma);

    this.financialEntryController = new FinancialEntryController(
      this.financialEntryService
    );

    this.router = Router()
      .delete(
        '/:id',
        async (req: Request, res: Response, next: NextFunction) => {
          await new RequestValidationMiddleware(
            FinancialEntrySchema.id,
            req.params.id
          ).validate(req, res, next);
        },
        async (
          req: Request<{ id: string }>,
          res: Response,
          next: NextFunction
        ) => {
          await this.financialEntryController.delete(req, res, next);
        }
      )
      .get('/', async (req: Request, res: Response, next: NextFunction) => {
        await this.financialEntryController.getAll(req, res, next);
      })
      .get(
        '/:id',
        async (req: Request, res: Response, next: NextFunction) => {
          await new RequestValidationMiddleware(
            FinancialEntrySchema.id,
            req.params.id
          ).validate(req, res, next);
        },
        async (
          req: Request<{ id: string }>,
          res: Response,
          next: NextFunction
        ) => {
          await this.financialEntryController.getOne(req, res, next);
        }
      )
      .post(
        '/',
        async (req: Request, res: Response, next: NextFunction) => {
          await new RequestValidationMiddleware(
            FinancialEntrySchema.amount,
            req.body.amount
          ).validate(req, res, next);
        },
        async (req: Request, res: Response, next: NextFunction) => {
          await new RequestValidationMiddleware(
            FinancialEntrySchema.description,
            req.body.description
          ).validate(req, res, next);
        },
        async (req: Request, res: Response, next: NextFunction) => {
          await new RequestValidationMiddleware(
            FinancialEntrySchema.statusId,
            req.body.statusId
          ).validate(req, res, next);
        },
        async (req: Request, res: Response, next: NextFunction) => {
          await new RequestValidationMiddleware(
            FinancialEntrySchema.typeId,
            req.body.typeId
          ).validate(req, res, next);
        },
        async (req: Request, res: Response, next: NextFunction) => {
          await this.financialEntryController.create(req, res, next);
        }
      )
      .put(
        '/:id',
        async (req: Request, res: Response, next: NextFunction) => {
          await new RequestValidationMiddleware(
            FinancialEntrySchema.id,
            req.params.id
          ).validate(req, res, next);
        },
        async (req: Request, res: Response, next: NextFunction) => {
          await new RequestValidationMiddleware(
            FinancialEntrySchema.amountOptional,
            req.body.amount
          ).validate(req, res, next);
        },
        async (req: Request, res: Response, next: NextFunction) => {
          await new RequestValidationMiddleware(
            FinancialEntrySchema.statusIdOptional,
            req.body.statusId
          ).validate(req, res, next);
        },
        async (
          req: Request<{ id: string }, FinancialEntry, Partial<FinancialEntry>>,
          res: Response,
          next: NextFunction
        ) => {
          await this.financialEntryController.update(req, res, next);
        }
      );
  }
}

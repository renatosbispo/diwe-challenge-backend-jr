import { ITokenPayload } from '../../src/interfaces';

// Taken from: https://stackoverflow.com/a/58788706/17501748
declare global {
  declare namespace Express {
    interface Request {
      tokenPayload: ITokenPayload;
    }
  }
}

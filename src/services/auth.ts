import jwt, { SignOptions } from 'jsonwebtoken';
import { ITokenPayload } from '../interfaces';
import ErrorWithCode, { ErrorCode } from '../lib/error-with-code';

export default class AuthService {
  public static generateToken(payload: ITokenPayload): string {
    const jwtConfig: SignOptions = {
      expiresIn: '1h',
      algorithm: 'HS256',
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET as string, jwtConfig);

    return token;
  }

  public static verifyToken(token: string | undefined): ITokenPayload {
    if (!token) {
      throw new ErrorWithCode(ErrorCode.TOKEN_NOT_FOUND, 'Token not found');
    }

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET  as string);

      return payload as ITokenPayload;
    } catch (error) {
      throw new ErrorWithCode(ErrorCode.TOKEN_EXPIRED_OR_INVALID, 'Invalid token');
    }
  }
}

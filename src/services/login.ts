import { PrismaClient } from '@prisma/client';
import { ILoginCredentials, ITokenPayload } from '../interfaces';
import CryptoService from './crypto';
import ErrorWithCode, { ErrorCode } from '../lib/error-with-code';

export default class LoginService {
  protected prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async validateCredentials(
    credentials: ILoginCredentials
  ): Promise<ITokenPayload> {
    const { email, password } = credentials;

    const user = await this.prisma.user.findFirst({ where: { email } });

    if (!user || !(await CryptoService.compare(password, user.password))) {
      throw new ErrorWithCode(
        ErrorCode.LOGIN_INFO_INVALID,
        'Wrong email or password.'
      );
    }

    return { email, id: user.id };
  }
}

import bcrypt from 'bcryptjs';

export default class CryptoService {
  public static async hash(password: string): Promise<string> {
    const passwordHash = await bcrypt.hash(password, 10);

    return passwordHash;
  }

  public static async compare(
    password: string,
    passwordHash: string
  ): Promise<boolean> {
    const result = await bcrypt.compare(password, passwordHash);

    return result;
  }
}

import { Injectable } from '@nestjs/common';
import { HashingProvider } from './hashing.provider';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptProvider implements HashingProvider {
  public async hashPassword(password: string | Buffer): Promise<string> {
    try {
      // generate a salt
      const salt = await bcrypt.genSalt();
      // hash the password
      return await bcrypt.hash(password, salt);
    } catch {
      throw new Error('Error hashing password');
    }
  }
  async comparePassword(
    plainPassword: string | Buffer,
    hashedPassword: string,
  ): Promise<boolean> {
    try {
      return await bcrypt.compare(plainPassword, hashedPassword);
    } catch {
      return false;
    }
  }
}

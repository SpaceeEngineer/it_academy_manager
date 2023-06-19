import * as bcrypt from 'bcryptjs';

export class HashService {
  async getHashString(incominString: string): Promise<string> {
    return await bcrypt.hash(incominString, 5);
  }

  async isEquals(firstValue: string, secondValue: string): Promise<boolean> {
    return await bcrypt.compare(firstValue, secondValue);
  }
}

import { IUser } from 'src/users/interfaces/IUser';

export interface IMailService {
  sendResetPasswordLink(user: IUser, url: string): Promise<void>;

  sendCompleteRegistrationLink(user: IUser, url: string): Promise<void>;
}

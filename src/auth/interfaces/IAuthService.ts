import { ICreateUser } from 'src/users/interfaces/ICreateUser';
import { ICreateUserPartially } from 'src/users/interfaces/ICreateUserPartially';
import { IChangePassword } from './IChangePassword';
import { ICompleteRegistration } from './ICompleteRegistration';
import { ILoginUser } from './ILoginUser';
import { IMessage } from './IMessage';

export interface IAuthService {
  registration(createUser: ICreateUser);

  login(loginUser: ILoginUser);

  sendForgotPasswordLink(email: string): Promise<IMessage>;

  resetPassword(token: string, password: string, passwordConfirm: string): Promise<IMessage>;

  changePassword(resetPassword: IChangePassword);

  registerUserWithEmail(registerUserData: ICreateUserPartially): Promise<IMessage>;

  completeRegistration(completeRegistrationData: ICompleteRegistration): Promise<IMessage>;

  sendCompleteRegistrationLink(email: string): Promise<IMessage>;
}

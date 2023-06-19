import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ILoginUser } from './interfaces/ILoginUser';
import { ICreateUser } from 'src/users/interfaces/ICreateUser';
import { IChangePassword } from './interfaces/IChangePassword';
import { HashService } from './hash.service';
import { ICreateUserPartially } from 'src/users/interfaces/ICreateUserPartially';
import { ICompleteRegistration } from './interfaces/ICompleteRegistration';
import { IUserService } from 'src/users/interfaces/IUserService';
import {
  HASH_SERVICE,
  MAIL_SERVICE,
  USER_LOGIN_HISTORY_SERVICE,
  USER_SERVICE,
} from 'src/shared/constants/serviceConstants';
import { IMailService } from 'src/mail/interfaces/IMailService';
import { IUserLoginHistoryService } from 'src/userLoginHistory/interfaces/IUserLoginHistoryService';
import { IAuthService } from './interfaces/IAuthService';
import { IMessage } from './interfaces/IMessage';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(USER_SERVICE)
    private usersService: IUserService,
    private jwtService: JwtService,
    @Inject(MAIL_SERVICE)
    private mailService: IMailService,
    @Inject(HASH_SERVICE)
    private hashService: HashService,
    @Inject(USER_LOGIN_HISTORY_SERVICE)
    private userLoginHistoryService: IUserLoginHistoryService,
  ) {}

  private async validateUser(loginUser: ILoginUser) {
    const user = await this.usersService.getUserByEmail(loginUser.email);

    if (user && user.accouuntStatus === 'active') {
      const passwordEquals = await this.hashService.isEquals(loginUser.password, user.password);

      if (passwordEquals) {
        return await this.usersService.getOneByEmailForValidate(loginUser.email);
      }
    } else if (user && user.accouuntStatus === 'pending') {
      throw new UnauthorizedException('User need to complete registration first');
    }

    throw new UnauthorizedException({
      message: 'User is not authorized',
    });
  }

  async registration(createUser: ICreateUser) {
    const user = await this.usersService.getUserByEmail(createUser.email);
    if (user) {
      throw new ConflictException('Such user already exists');
    }

    const hashPassword: string = (
      await this.hashService.getHashString(createUser.password)
    ).toString();
    await this.usersService.createUser({
      ...createUser,
      password: hashPassword,
    });

    return {
      message: `User is created`,
    };
  }

  async login(loginUser: ILoginUser) {
    const user = await this.validateUser(loginUser);
    await this.userLoginHistoryService.createUserLoginHistory(user.id);
    const payload = { id: user.id, email: user.email, roleId: user.roleId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async sendForgotPasswordLink(email: string): Promise<IMessage> {
    const user = await this.usersService.getUserByEmail(email);
    if (!user) {
      throw new NotFoundException('User with such email does not exist');
    }
    const token = this.jwtService.sign(
      { id: user.id, email: user.email },
      { secret: process.env.RESET_PASSWORD_KEY, expiresIn: '30m' },
    );
    const url = `${process.env.URL}:${process.env.PORT}/reset-password?token=${token}`;
    await this.mailService.sendResetPasswordLink(user, url);
    return {
      message: `The email has been sent successfully`,
    };
  }

  async resetPassword(token: string, password: string, passwordConfirm: string): Promise<IMessage> {
    if (password !== passwordConfirm) {
      throw new BadRequestException('Passwords dont match');
    }

    try {
      await this.jwtService.verify(token, { secret: process.env.RESET_PASSWORD_KEY });
    } catch (error: any) {
      throw new UnauthorizedException('Invalid token');
    }

    const { id } = this.jwtService.decode(token) as {
      id: number;
    };

    const hashedPassword = await this.hashService.getHashString(password);

    await this.usersService.update(id, { password: hashedPassword });
    return {
      message: `Account password has been changed successfully`,
    };
  }

  async changePassword(resetPassword: IChangePassword) {
    const user = await this.usersService.getOneById(resetPassword.id);

    if (!user) throw new NotFoundException('User with given id does not exist');

    const passwordEquals = await this.hashService.isEquals(
      resetPassword.oldPassword,
      user.password,
    );

    if (!passwordEquals)
      throw new UnprocessableEntityException("Incorrect old password! Password didn't reset!");

    const hashNewPassword: string = (
      await this.hashService.getHashString(resetPassword.newPassword)
    ).toString();

    await this.usersService.update(resetPassword.id, { password: hashNewPassword });

    return 'Password changed successfully';
  }

  async sendCompleteRegistrationLink(email: string): Promise<IMessage> {
    const user = await this.usersService.getUserByEmail(email);
    if (!user) {
      throw new NotFoundException('User Not Found');
    } else if (user.accouuntStatus !== 'pending') {
      throw new ConflictException('Such user already fully registered');
    }
    const token = this.jwtService.sign(
      { id: user.id, email: user.email },
      { secret: process.env.COMPLETE_REG_KEY, expiresIn: '24h' },
    );
    const url = `${process.env.URL}:${process.env.PORT}/complete-reg?token=${token}`;
    await this.mailService.sendCompleteRegistrationLink(user, url);

    return {
      message: `The email has been sent successfully`,
    };
  }

  async registerUserWithEmail(registerUserData: ICreateUserPartially): Promise<IMessage> {
    const newUser = await this.usersService.createUserPartially(registerUserData);
    await this.sendCompleteRegistrationLink(newUser.email);

    return {
      message: `User is created. The email has been sent successfully`,
    };    
  }

  async completeRegistration(completeRegistrationData: ICompleteRegistration): Promise<IMessage> {
    const { token, password, passwordConfirm, ...userData } = completeRegistrationData;

    if (password !== passwordConfirm) {
      throw new BadRequestException('Passwords dont match');
    }

    try {
      await this.jwtService.verifyAsync(token, { secret: process.env.COMPLETE_REG_KEY });
    } catch (error: any) {
      throw new UnauthorizedException('Invalid token');
    }

    const { id } = this.jwtService.decode(token) as {
      id: number;
    };

    const hashedPassword = await this.hashService.getHashString(password);
    await this.usersService.update(id, {
      password: hashedPassword,
      accouuntStatus: 'active',
      ...userData,
    });

    return {
      message: `Account has been registered successfully. You can now login`,
    };
  }
}

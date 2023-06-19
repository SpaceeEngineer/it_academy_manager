import { Body, Controller, HttpCode, HttpStatus, Inject, Post, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { JwtAuthGuard } from './jwt.auth.guard';
import { IAccessToken } from './interfaces/IAccessToken';
import { RegisterUserWithEmailDto } from './dto/register-user-with-email.dto';
import { SendEmailDto } from './dto/send-email.dto';
import { CompleteRegistrationDto } from './dto/complete-registration.dto';
import { Roles } from 'src/roles/roles.auth.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { AUTH_SERVICE } from 'src/shared/constants/serviceConstants';
import { IAuthService } from './interfaces/IAuthService';
import { IMessage } from './interfaces/IMessage';

@Controller('auth')
@ApiTags('Authentication')
@ApiSecurity('JWT-auth')
export class AuthController {
  constructor(
    @Inject(AUTH_SERVICE)
    private authService: IAuthService,
  ) {}

  @Post('/login')
  @ApiOperation({
    summary: 'Login user authentication',
    description: 'In this way you will get the Token for Bearer authentication',
  })
  @ApiCreatedResponse({ description: 'Login success, you will receive the "accessToken" there' })
  @ApiBadRequestResponse({ description: 'Validation failed' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBody({ type: LoginUserDto })
  login(@Body() loginUserDto: LoginUserDto): Promise<IAccessToken> {
    return this.authService.login(loginUserDto);
  }

  @Post('/registration')
  @ApiOperation({
    summary: 'User registration',
    description: 'In this way you will be registered',
  })
  @ApiBody({ type: CreateUserDto })
  @ApiBadRequestResponse({ description: 'Validation failed' })
  @ApiConflictResponse({ description: 'Such user already exists' })
  @ApiCreatedResponse({ type: CreateUserDto, description: 'User registration' })
  registration(@Body() userDto: CreateUserDto): Promise<{ message: string }> {
    return this.authService.registration(userDto);
  }

  @Post('/forgot-password')
  @ApiOperation({
    summary: 'User forgot password',
    description: 'In this way you will get the email with reset password link',
  })
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: ForgotPasswordDto })
  @ApiBadRequestResponse({ description: 'Validation failed (email must be an email)' })
  @ApiNotFoundResponse({ description: 'User with such email does not exist' })
  @ApiOkResponse({
    type: ForgotPasswordDto,
    description: 'The email has been sent successfully',
  })
  forgot(@Body() body: ForgotPasswordDto): Promise<IMessage> {
    return this.authService.sendForgotPasswordLink(body.email);
  }

  @Post('/reset-password')
  @ApiOperation({
    summary: 'User reset password',
    description: 'In this way you can reset your password ',
  })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: ResetPasswordDto,
    description: 'The password has been changed successfully',
  })
  @ApiBadRequestResponse({ description: 'Validation failed' })
  @ApiUnauthorizedResponse({ description: 'Invalid JWT token' })
  @ApiBody({ type: ResetPasswordDto })
  reset(@Body() body: ResetPasswordDto): Promise<IMessage> {
    return this.authService.resetPassword(body.token, body.password, body.passwordConfirm);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/change-password')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'User change password',
    description: 'In this way you can change your password ',
  })
  @ApiCreatedResponse({ type: ChangePasswordDto, description: 'Change password' })
  @ApiNotFoundResponse({ description: 'User with given id does not exist' })
  @ApiBadRequestResponse({ description: 'Validation failed' })
  @ApiUnprocessableEntityResponse({ description: 'Incorrect old password' })
  @ApiBody({ type: ChangePasswordDto })
  changePassword(@Body() passwordDto: ChangePasswordDto): Promise<string> {
    return this.authService.changePassword(passwordDto);
  }

  @Roles('MANAGER')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post('/reg/user')
  @ApiOperation({
    summary: 'Register user with email',
    description:
      'In this way you can create user with email(without password) as manager and send email link to complete the registration',
  })
  @HttpCode(HttpStatus.OK)
  @ApiBadRequestResponse({ description: 'Validation failed' })
  @ApiConflictResponse({ description: 'Such user already fully registered' })
  @ApiOkResponse({ description: 'User created and email has beed sent' })
  @ApiBody({ type: RegisterUserWithEmailDto })
  registerUserWithEmail(@Body() registerUserWithEmailDto: RegisterUserWithEmailDto): Promise<IMessage> {
    return this.authService.registerUserWithEmail(registerUserWithEmailDto);
  }

  @Roles('MANAGER')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post('/reg/send-email')
  @ApiOperation({
    summary: 'Send email to complete the registration',
    description:
      'In this way you can send email to user with instructions to complete the registration',
  })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'The email has been sent successfully' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiConflictResponse({ description: 'Such user already fully registered' })
  @ApiBadRequestResponse({ description: 'Validation failed (email must be an email)' })
  @ApiBody({ type: SendEmailDto })
  sendCompleteRegLink(@Body() body: SendEmailDto): Promise<IMessage> {
    return this.authService.sendCompleteRegistrationLink(body.email);
  }

  @Post('/reg/complete')
  @ApiOperation({
    summary: 'Complete the registration',
    description: 'User can fill the rest fields to complete the registration',
  })
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Account has been registered successfully. Now user can login' })
  @ApiBadRequestResponse({ description: 'Validation failed' })
  @ApiUnauthorizedResponse({ description: 'Invalid JWT token' })
  @ApiBody({ type: CompleteRegistrationDto })
  completeReg(@Body() body: CompleteRegistrationDto): Promise<IMessage> {
    return this.authService.completeRegistration(body);
  }
}

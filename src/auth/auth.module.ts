import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { MailModule } from '../mail/mail.module';
import { UserLoginHistoryModule } from 'src/userLoginHistory/userLoginHistory.module';
import { diAuthService, diHashService } from 'src/shared/diConfig/serviceDiConfig';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  controllers: [AuthController],
  providers: [diAuthService, JwtStrategy, diHashService],
  imports: [
    forwardRef(() => UsersModule),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions: {
        expiresIn: '24h',
      },
    }),
    MailModule,
    UserLoginHistoryModule,
    RolesModule,
  ],
  exports: [diAuthService, JwtModule, diHashService],
})
export class AuthModule {}

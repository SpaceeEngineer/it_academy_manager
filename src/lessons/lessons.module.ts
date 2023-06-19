import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from './entities/Lesson';
import { LessonsController } from './controllers/lessons.controller';
import { Role } from 'src/roles/entities/Role';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { diLessonService } from 'src/shared/diConfig/serviceDiConfig';
import { diLessonRepository } from 'src/shared/diConfig/daoDiConfig';

@Module({
  imports: [
    TypeOrmModule.forFeature([Lesson, Role]),
    RolesModule,
    forwardRef(() => AuthModule),
    forwardRef(() => UsersModule),
  ],
  controllers: [LessonsController],
  providers: [diLessonService, diLessonRepository],
  exports: [diLessonService],
})
export class LessonsModule {}

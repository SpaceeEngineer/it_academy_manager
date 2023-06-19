import { Module } from '@nestjs/common';
import { AppModule } from '../app.module';
import { SeederProvider } from './seeder.provider';
import { UserSeederModule } from './user/user.seeder.module';
import { RoleSeederModule } from './role/role.seeder.module';
import { CourseSeederModule } from './course/course.seeder.module';

@Module({
  imports: [AppModule, UserSeederModule, RoleSeederModule, CourseSeederModule],
  providers: [SeederProvider],
})
export class SeederModule {}

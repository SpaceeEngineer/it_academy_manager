import { Injectable } from '@nestjs/common';
import { RoleSeederService } from './role/role.seeder.service';
import { UserSeederService } from './user/user.seeder.service';
import { CourseSeederService } from './course/course.seeder.service';

@Injectable()
export class SeederProvider {
  constructor(
    private readonly userSeederService: UserSeederService,
    private readonly roleSeederService: RoleSeederService,
    private readonly courseSeederService: CourseSeederService,
  ) {}

  async seed() {
    await Promise.all(this.roleSeederService.create());
    await Promise.all(this.userSeederService.create());
    await Promise.all(this.courseSeederService.create());
  }
}

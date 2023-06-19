import { IRole } from 'src/roles/interfaces/IRole';
import { IUser } from 'src/users/interfaces/IUser';
import { RoleEnum } from '../roles/roles.enum';
import { ICourse } from '../courses/interfaces/ICourse';
import { StatusEnum } from '../courses/status.enum';

export const roles: IRole[] = [{ roleName: RoleEnum.USER }, { roleName: RoleEnum.MANAGER }];

export const users: IUser[] = [
  {
    firstName: 'Ivan',
    lastName: 'Ivanov',
    email: 'manager@gmail.com',
    password: '$2a$05$rQrwurZk9p0UtMBemOF8qOaXNCGD7JICVt/c/zd72xx3CoR7yPk66',
    telephone: '+380934589123',
    city: 'Kyiv',
    dob: new Date(1990, 5, 5),
    accouuntStatus: 'active',
    roleId: 2,
  },
];

export const courses: ICourse[] = [
  {
    title: 'NODE JS 2022',
    startDate: new Date(2022, 9, 9),
    endDate: new Date(2022, 12, 9),
    status: StatusEnum.ACTIVE,
  },
  {
    title: 'HTML 2022',
    startDate: new Date(2022, 9, 9),
    endDate: new Date(2022, 12, 9),
    status: StatusEnum.ACTIVE,
  },
  {
    title: 'PHP 2022',
    startDate: new Date(2022, 9, 9),
    endDate: new Date(2022, 12, 9),
    status: StatusEnum.ACTIVE,
  },
];
export const userRoleMapping = new Map<string, RoleEnum>([['manager@gmail.com', RoleEnum.MANAGER]]);

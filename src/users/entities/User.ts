import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { Role } from '../../roles/entities/Role';
import { IRole } from '../../roles/interfaces/IRole';
import { IUser } from '../interfaces/IUser';
import { Course } from 'src/courses/entities/Course';
import { Lesson } from 'src/lessons/entities/Lesson';
import { UserLoginHistory } from 'src/userLoginHistory/entities/UserLoginHistory';

@Entity({
  name: 'users',
})
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: false, name: 'first_name', length: 255 })
  firstName: string;

  @Column({ nullable: false, name: 'last_name', length: 255 })
  lastName: string;

  @Column({ nullable: false, unique: true, length: 255 })
  email: string;

  @Column({ nullable: true, length: 255 })
  password: string;

  @Column({ nullable: true, name: 'telephone', length: 255 })
  telephone: string;

  @Column({ nullable: true, length: 255 })
  city: string;

  @Column({ nullable: true })
  dob: Date;

  @Column({ nullable: false, name: 'account_status', length: 255 })
  accouuntStatus: string;

  @Column({ nullable: false, name: 'role_id' })
  roleId: number;

  @ManyToOne(() => Role, (entity: Role) => entity.id)
  @JoinColumn({ name: 'role_id' })
  role?: IRole;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @ManyToMany(() => Course, (course) => course.users, {
    onDelete: 'CASCADE',
  })
  courses?: Course[];

  @ManyToMany(() => Lesson, (lesson) => lesson.users, {
    onDelete: 'CASCADE',
  })
  lessons?: Lesson[];

  @OneToMany(() => UserLoginHistory, (user_login_history) => user_login_history.user, {
    onDelete: 'CASCADE',
  })
  user_login_history?: UserLoginHistory[];
}

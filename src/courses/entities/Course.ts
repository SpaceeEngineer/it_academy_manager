import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Lesson } from 'src/lessons/entities/Lesson';
import { User } from 'src/users/entities/User';
import { ICourse } from '../interfaces/ICourse';
import { StatusEnum } from '../status.enum';

@Entity({
  name: 'courses',
})
export class Course implements ICourse {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: false, length: 255 })
  title: string;

  @Column({ nullable: false, name: 'start_date' })
  startDate: Date;

  @Column({ nullable: false, name: 'end_date' })
  endDate: Date;

  @Column({
    nullable: false,
    type: 'enum',
    enum: StatusEnum,
    default: StatusEnum.ACTIVE,
  })
  status: StatusEnum;

  @OneToMany(() => Lesson, (entity: Lesson) => entity.course)
  lessons?: Lesson[];

  @ManyToMany(() => User, (user) => user.courses, {
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'courses_users',
    joinColumn: {
      name: 'course_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  users?: User[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;
}

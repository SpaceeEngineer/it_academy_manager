import { User } from 'src/users/entities/User';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ILesson } from '../interfaces/ILesson';
import { Course } from 'src/courses/entities/Course';
import { ICourse } from 'src/courses/interfaces/ICourse';

@Entity({
  name: 'lessons',
})
export class Lesson implements ILesson {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: false, length: 255 })
  title: string;

  @Column({ nullable: false, length: 255 })
  lecturer: string;

  @Column({ name: 'course_id' })
  courseId: number;

  @ManyToOne(() => Course, (entity: Course) => entity.lessons, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'course_id' })
  course?: ICourse;

  @Column({ nullable: false, name: 'date_and_time' })
  dateAndTime: Date;

  @Column({ nullable: false, length: 255 })
  link: string;

  @Column({ nullable: false, length: 600, name: 'home_task_description' })
  homeTaskDescription: string;

  @ManyToMany(() => User, (user) => user.lessons, {
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'lessons_users',
    joinColumn: {
      name: 'lessons_id',
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

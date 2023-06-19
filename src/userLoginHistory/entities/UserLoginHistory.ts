import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { User } from 'src/users/entities/User';
import { IUser } from 'src/users/interfaces/IUser';
import { IUserLoginHistory } from '../interfaces/IUserLoginHistory';

@Entity({
  name: 'user_login_history',
})
export class UserLoginHistory implements IUserLoginHistory {
  @PrimaryGeneratedColumn()
  id?: number;

  @CreateDateColumn({ name: 'login_at' })
  logindAt: Date;

  @Column({ nullable: false, name: 'user_id' })
  userId: number;

  @ManyToOne(() => User, (entity: User) => entity.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user?: IUser;
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IRole } from '../interfaces/IRole';

@Entity({
  name: 'roles',
})
export class Role implements IRole {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: false, name: 'role_name', length: 255 })
  roleName: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;
}

import { User } from 'src/user/entities/user.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum RoleCode {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  code: string;

  @Column()
  description: string;

  @OneToMany(() => User, (user) => user.role)
  users: User[];

  @BeforeInsert()
  @BeforeUpdate()
  codeToUppercase() {
    this.code = this.code.trim().toLocaleUpperCase();
  }
}

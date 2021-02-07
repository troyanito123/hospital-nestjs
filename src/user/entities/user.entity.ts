import { Role } from 'src/role/entities/role.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PasswordEncrypter } from '../password-encrypter';
import { History } from '../../history/entities/history.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @OneToMany(() => History, (history) => history.user)
  histories: History[];

  authenicate(password: string): boolean {
    return PasswordEncrypter.compare(password, this.password);
  }
}

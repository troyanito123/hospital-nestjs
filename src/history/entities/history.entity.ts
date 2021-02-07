import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ConsultingRoom } from '../../consulting-room/entities/consulting-room.entity';
import { Patient } from '../../patient/entities/patient.entity';
import { User } from '../../user/entities/user.entity';

export enum HistoryStatus {
  active = 'ACTIVE',
  deleted = 'DELETED',
}

@Entity({ name: 'histories' })
export class History {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  laboratories: number;

  @Column({ default: 0 })
  x_ray: number;

  @Column({ default: 0 })
  recipes: number;

  @Column({ default: HistoryStatus.active })
  status: HistoryStatus;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.histories)
  user: User;

  @ManyToOne(() => Patient, (patient) => patient.histories)
  patient: Patient;

  @ManyToOne(
    () => ConsultingRoom,
    (consulting_room) => consulting_room.histories,
  )
  consulting_room: ConsultingRoom;
}

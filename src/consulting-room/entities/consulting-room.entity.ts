import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { History } from '../../history/entities/history.entity';

export enum ConsultinRoomStatus {
  active = 'ACTIVE',
  invactive = 'INACTIVE',
}

@Entity({ name: 'consulting_rooms' })
export class ConsultingRoom {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  location: string;

  @Column({ default: ConsultinRoomStatus.active })
  status: ConsultinRoomStatus;

  @OneToMany(() => History, (history) => history.consulting_room)
  histories: History[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  @BeforeUpdate()
  setAttributeToUppercase() {
    this.name = this.name.toUpperCase();
  }
}

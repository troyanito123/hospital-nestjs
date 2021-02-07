import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { History } from '../../history/entities/history.entity';

export enum PatientStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

@Entity({ name: 'patients' })
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Index()
  name: string;

  @Column()
  enrollment: string;

  @Column()
  code: string;

  @Column()
  company: string;

  @Column({ name: 'employer_number' })
  employer_number: string;

  @Column({ default: PatientStatus.ACTIVE })
  status: PatientStatus;

  @OneToMany(() => History, (history) => history.patient)
  histories: History[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  @BeforeUpdate()
  toUpperCase() {
    this.enrollment = this.enrollment.toUpperCase();
    this.code = this.code.toUpperCase();
    this.employer_number = this.employer_number.toUpperCase();
    this.name = this.name.toUpperCase();
  }
}

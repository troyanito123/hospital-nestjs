import { Injectable } from '@nestjs/common';
import { HistoryStatus } from 'src/history/entities/history.entity';
import { CreatePatientDto } from './dto/create-patient.dto';
import { FindAllParamsPatient } from './dto/find-all-params-patient';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PatientStatus } from './entities/patient.entity';
import { PatientRepository } from './patient.repository';

@Injectable()
export class PatientService {
  constructor(private patientRepository: PatientRepository) {}
  create(createPatientDto: CreatePatientDto) {
    const newPatient = this.patientRepository.create(createPatientDto);
    return this.patientRepository.save(newPatient);
  }

  async findAll(query: FindAllParamsPatient) {
    console.log(query);
    const resp = await this.patientRepository
      .createQueryBuilder('patient')
      .where('patient.status = :status', { status: PatientStatus.ACTIVE })
      .andWhere('patient.name ILIKE :filter', { filter: `%${query.filter}%` })
      .skip(query.pageNumber * query.pageSize)
      .take(query.pageSize)
      .orderBy('patient.name', query.sortOrder)
      .getManyAndCount();
    return {
      count: resp[1],
      data: resp[0],
    };
  }

  findOne(id: number) {
    return this.patientRepository
      .createQueryBuilder('patient')
      .leftJoinAndSelect(
        'patient.histories',
        'history',
        'history.status = :status',
        { status: HistoryStatus.active },
      )
      .leftJoinAndSelect('history.consulting_room', 'consulting_room')
      .where('patient.id = :id', { id })
      .andWhere('patient.status = :status', { status: PatientStatus.ACTIVE })
      .getOne();
  }

  async update(id: number, updatePatientDto: UpdatePatientDto) {
    const patient = await this.patientRepository.findOne(id);
    this.patientRepository.merge(patient, updatePatientDto);
    try {
      return await this.patientRepository.save(patient);
    } catch (error) {
      return null;
    }
  }

  async remove(id: number) {
    const patient = await this.patientRepository.findOne(id);
    patient.status = PatientStatus.INACTIVE;
    return this.patientRepository.save(patient);
  }
}

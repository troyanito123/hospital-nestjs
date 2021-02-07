import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
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

  findAll() {
    return this.patientRepository.find({
      where: { status: PatientStatus.ACTIVE },
    });
  }

  findOne(id: number) {
    return this.patientRepository.findOne({
      where: { id, status: PatientStatus.ACTIVE },
      relations: ['histories'],
    });
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
import { IsNotEmpty } from 'class-validator';
import { UniqueCode } from 'src/validations/unique-code';
import { UniqueOnDatabase } from '../../validations/unique-on-database';
import { Patient } from '../entities/patient.entity';

export class CreatePatientDto {
  @UniqueCode(Patient)
  name: string;

  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  enrollment: string;

  @IsNotEmpty()
  company: string;

  @IsNotEmpty()
  employer_number: string;
}

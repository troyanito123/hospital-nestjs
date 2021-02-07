import { ExistsOnDatabase } from 'src/validations/exists-on-database';
import { Patient } from '../entities/patient.entity';

export class FindOneParamsPatient {
  @ExistsOnDatabase(Patient)
  id: number;
}

import { ExistsOnDatabase } from 'src/validations/exists-on-database';
import { History } from '../entities/history.entity';

export class FindOneParamsHistory {
  @ExistsOnDatabase(History)
  id: number;
}

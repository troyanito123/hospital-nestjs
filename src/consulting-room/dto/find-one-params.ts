import { ExistsOnDatabase } from 'src/validations/exists-on-database';
import { ConsultingRoom } from '../entities/consulting-room.entity';

export class FindOneParams {
  @ExistsOnDatabase(ConsultingRoom)
  id: number;
}

import { IsNotEmpty } from 'class-validator';
import { UniqueOnDatabase } from 'src/validations/unique-on-database';
import { ConsultingRoom } from '../entities/consulting-room.entity';

export class CreateConsultingRoomDto {
  @UniqueOnDatabase(ConsultingRoom)
  name: string;

  @IsNotEmpty()
  location: string;
}

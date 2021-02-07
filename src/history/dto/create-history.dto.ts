import { IsOptional } from 'class-validator';
import { ConsultingRoom } from 'src/consulting-room/entities/consulting-room.entity';
import { Patient } from 'src/patient/entities/patient.entity';
import { ExistsOnDatabase } from 'src/validations/exists-on-database';

export class CreateHistoryDto {
  @IsOptional()
  laboratories: number;

  @IsOptional()
  x_ray: number;

  @IsOptional()
  recipes: number;

  @ExistsOnDatabase(ConsultingRoom)
  consulting_room_id: number;

  @ExistsOnDatabase(Patient)
  patient_id: number;
}

import { IsNotEmpty } from 'class-validator';

export class UpdateConsultingRoomDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  location: string;
}

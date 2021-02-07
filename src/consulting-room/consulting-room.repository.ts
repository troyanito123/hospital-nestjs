import { EntityRepository, Repository } from 'typeorm';
import { ConsultingRoom } from './entities/consulting-room.entity';

@EntityRepository(ConsultingRoom)
export class ConsultingRoomRepository extends Repository<ConsultingRoom> {}

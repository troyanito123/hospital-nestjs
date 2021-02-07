import { Injectable } from '@nestjs/common';
import { ConsultingRoomRepository } from './consulting-room.repository';
import { CreateConsultingRoomDto } from './dto/create-consulting-room.dto';
import { UpdateConsultingRoomDto } from './dto/update-consulting-room.dto';
import { ConsultinRoomStatus } from './entities/consulting-room.entity';

@Injectable()
export class ConsultingRoomService {
  constructor(private consRoomRepo: ConsultingRoomRepository) {}
  create(createConsultingRoomDto: CreateConsultingRoomDto) {
    const consultingRoom = this.consRoomRepo.create(createConsultingRoomDto);
    return this.consRoomRepo.save(consultingRoom);
  }

  findAll() {
    return this.consRoomRepo.find({
      where: { status: ConsultinRoomStatus.active },
    });
  }

  findOne(id: number) {
    return this.consRoomRepo.findOne({
      where: { id, status: ConsultinRoomStatus.active },
    });
  }

  async update(id: number, updateConsultingRoomDto: UpdateConsultingRoomDto) {
    const consRoom = await this.consRoomRepo.findOne({
      where: { id, status: ConsultinRoomStatus.active },
    });
    this.consRoomRepo.merge(consRoom, updateConsultingRoomDto);
    try {
      return await this.consRoomRepo.save(consRoom);
    } catch (error) {
      return null;
    }
  }

  async remove(id: number) {
    const consRoom = await this.consRoomRepo.findOne(id);
    consRoom.status = ConsultinRoomStatus.invactive;
    return this.consRoomRepo.save(consRoom);
  }
}

import { Injectable } from '@nestjs/common';
import { ConsultingRoomService } from 'src/consulting-room/consulting-room.service';
import { PatientStatus } from 'src/patient/entities/patient.entity';
import { PatientService } from 'src/patient/patient.service';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { HistoryStatus } from './entities/history.entity';
import { HistoryRepository } from './history.repository';

@Injectable()
export class HistoryService {
  constructor(
    private historyRespository: HistoryRepository,
    private consRoomService: ConsultingRoomService,
    private userSerivce: UserService,
    private patientService: PatientService,
  ) {}
  async create(createHistoryDto: CreateHistoryDto, userToken: User) {
    const newHistory = this.historyRespository.create(createHistoryDto);

    newHistory.patient = await this.patientService.findOne(
      createHistoryDto.patient_id,
    );
    newHistory.consulting_room = await this.consRoomService.findOne(
      createHistoryDto.consulting_room_id,
    );
    newHistory.user = await this.userSerivce.findOne(userToken.id);

    const historyDB = await this.historyRespository.save(newHistory);

    const { user, patient, ...result } = historyDB;
    return result;
  }

  findAll() {
    return this.historyRespository.find();
  }

  findOne(id: number) {
    return this.historyRespository.findOne({
      where: { id, status: HistoryStatus.active },
      relations: ['consulting_room'],
    });
  }

  async update(id: number, updateHistoryDto: UpdateHistoryDto) {
    const historyDB = await this.historyRespository.findOne(id);
    const consultingRoomDB = await this.consRoomService.findOne(
      updateHistoryDto.consulting_room_id,
    );
    this.historyRespository.merge(historyDB, updateHistoryDto);
    historyDB.consulting_room = consultingRoomDB;
    return this.historyRespository.save(historyDB);
  }

  async remove(id: number) {
    const history = await this.historyRespository.findOne(id);
    history.status = HistoryStatus.deleted;
    return this.historyRespository.save(history);
  }

  async findByUserId(userId: number, start: Date, end: Date) {
    return this.historyRespository
      .createQueryBuilder('history')
      .leftJoinAndSelect('history.patient', 'patient')
      .leftJoinAndSelect('history.consulting_room', 'consulting_room')
      .where('history.user = :userId', { userId })
      .andWhere('history.created_at BETWEEN :start and :end', { start, end })
      .andWhere('history.status = :status', { status: HistoryStatus.active })
      .andWhere('patient.status = :status', { status: PatientStatus.ACTIVE })
      .getMany();
  }
}

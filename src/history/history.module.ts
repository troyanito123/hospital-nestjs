import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientModule } from 'src/patient/patient.module';
import { ConsultingRoomModule } from 'src/consulting-room/consulting-room.module';
import { UserModule } from 'src/user/user.module';
import { History } from './entities/history.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([History]),
    PatientModule,
    ConsultingRoomModule,
    UserModule,
  ],
  exports: [HistoryService],
  controllers: [HistoryController],
  providers: [HistoryService],
})
export class HistoryModule {}

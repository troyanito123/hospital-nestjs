import { Module } from '@nestjs/common';
import { ConsultingRoomService } from './consulting-room.service';
import { ConsultingRoomController } from './consulting-room.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsultingRoom } from './entities/consulting-room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ConsultingRoom])],
  exports: [ConsultingRoomService],
  controllers: [ConsultingRoomController],
  providers: [ConsultingRoomService],
})
export class ConsultingRoomModule {}

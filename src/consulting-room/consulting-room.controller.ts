import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ConsultingRoomService } from './consulting-room.service';
import { CreateConsultingRoomDto } from './dto/create-consulting-room.dto';
import { FindOneParams } from './dto/find-one-params';
import { UpdateConsultingRoomDto } from './dto/update-consulting-room.dto';

@Controller('consulting-room')
@UseGuards(JwtAuthGuard)
export class ConsultingRoomController {
  constructor(private readonly consultingRoomService: ConsultingRoomService) {}

  @Post()
  create(@Body() createConsultingRoomDto: CreateConsultingRoomDto) {
    return this.consultingRoomService.create(createConsultingRoomDto);
  }

  @Get()
  findAll() {
    return this.consultingRoomService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: FindOneParams) {
    return this.consultingRoomService.findOne(params.id);
  }

  @Put(':id')
  async update(
    @Param() params: FindOneParams,
    @Body() updateConsultingRoomDto: UpdateConsultingRoomDto,
  ) {
    const consRoom = await this.consultingRoomService.update(
      params.id,
      updateConsultingRoomDto,
    );
    if (!consRoom) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          error: [
            `Already exist the name: ${updateConsultingRoomDto.name} in our table Consulting Room`,
          ],
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return consRoom;
  }

  @Delete(':id')
  remove(@Param() params: FindOneParams) {
    return this.consultingRoomService.remove(params.id);
  }
}

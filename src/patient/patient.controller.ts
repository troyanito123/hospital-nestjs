import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FindOneParamsPatient } from './dto/find-one-params-patient';

@UseGuards(JwtAuthGuard)
@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientService.create(createPatientDto);
  }

  @Get()
  findAll() {
    return this.patientService.findAll();
  }

  @Get(':id')
  async findOne(@Param() params: FindOneParamsPatient) {
    return this.patientService.findOne(params.id);
  }

  @Put(':id')
  async update(
    @Param() params: FindOneParamsPatient,
    @Body() updatePatientDto: UpdatePatientDto,
  ) {
    const patientDB = await this.patientService.update(
      params.id,
      updatePatientDto,
    );
    if (!patientDB) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: [
            `The field name: ${updatePatientDto.name} already exists. Choose another!`,
          ],
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return patientDB;
  }

  @Delete(':id')
  async remove(@Param() params: FindOneParamsPatient) {
    return this.patientService.remove(params.id);
  }
}

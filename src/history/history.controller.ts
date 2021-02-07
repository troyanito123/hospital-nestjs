import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Request,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HistoryService } from './history.service';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FindOneParamsHistory } from './dto/find-one-params-history';

@Controller('history')
@UseGuards(JwtAuthGuard)
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Post()
  create(@Body() createHistoryDto: CreateHistoryDto, @Request() req) {
    return this.historyService.create(createHistoryDto, req.user);
  }

  @Get()
  findAll() {
    return this.historyService.findAll();
  }

  @Get(':id')
  findOne(@Param() params: FindOneParamsHistory) {
    return this.historyService.findOne(params.id);
  }

  @Put(':id')
  update(
    @Param() params: FindOneParamsHistory,
    @Body() updateHistoryDto: UpdateHistoryDto,
  ) {
    return this.historyService.update(params.id, updateHistoryDto);
  }

  @Delete(':id')
  remove(@Param() params: FindOneParamsHistory) {
    return this.historyService.remove(params.id);
  }
}

import { Injectable } from '@nestjs/common';
import { HistoryService } from '../history/history.service';
import { CreateReportDto } from './dto/create-report.dto';

@Injectable()
export class ReportService {
  constructor(private historyService: HistoryService) {}

  getByUser(createReportDto: CreateReportDto, userId: number) {
    return this.historyService.findByUserId(
      userId,
      createReportDto.start,
      createReportDto.end,
    );
  }
}

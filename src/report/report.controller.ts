import { Body, Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateReportDto } from './dto/create-report.dto';
import { ReportService } from './report.service';

@Controller('report')
@UseGuards(JwtAuthGuard)
export class ReportController {
  constructor(private reportService: ReportService) {}

  @Get('user')
  getByUser(@Body() createReportDto: CreateReportDto, @Request() req) {
    return this.reportService.getByUser(createReportDto, +req.user.id);
  }
}

import { Module } from '@nestjs/common';
import { HistoryModule } from 'src/history/history.module';
import { PatientModule } from 'src/patient/patient.module';
import { UserModule } from 'src/user/user.module';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';

@Module({
  imports: [UserModule, PatientModule, HistoryModule],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}

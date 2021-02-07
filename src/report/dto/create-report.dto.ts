import { IsDate, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateReportDto {
  @IsDateString()
  start: Date;

  @IsDateString()
  end: Date;
}

import { IsNotEmpty } from 'class-validator';

export class UpdatePatientDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  enrollment: string;

  @IsNotEmpty()
  company: string;

  @IsNotEmpty()
  employer_number: string;
}

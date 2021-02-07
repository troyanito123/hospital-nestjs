import { IsNotEmpty, IsOptional } from 'class-validator';
import { UniqueCode } from 'src/validations/unique-code';
import { UniqueOnDatabase } from 'src/validations/unique-on-database';
import { Role } from '../entities/role.entity';

export class CreateRoleDto {
  @IsNotEmpty()
  name: string;

  @UniqueCode(Role)
  code: string;

  @IsOptional()
  description: string;
}

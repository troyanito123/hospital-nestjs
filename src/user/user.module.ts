import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { RoleModule } from 'src/role/role.module';
import { PasswordEncrypter } from './password-encrypter';

@Module({
  imports: [TypeOrmModule.forFeature([User]), RoleModule],
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService, PasswordEncrypter],
})
export class UserModule {}

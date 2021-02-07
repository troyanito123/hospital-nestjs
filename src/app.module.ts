import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PatientModule } from './patient/patient.module';
import { ConsultingRoomModule } from './consulting-room/consulting-room.module';
import { HistoryModule } from './history/history.module';
import { ReportModule } from './report/report.module';
import { DatabaseConfig } from './config/database.config';
import { ConfigModule } from '@nestjs/config';
import { config } from './config/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfig,
    }),
    RoleModule,
    UserModule,
    AuthModule,
    PatientModule,
    ConsultingRoomModule,
    HistoryModule,
    ReportModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

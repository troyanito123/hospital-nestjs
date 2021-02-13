import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigOptions } from './config/config';
import generateTypeormConfigFile from './scripts/generate-typeormconfig-file';
import setDefaultData from './scripts/set-default-data';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  const port = configService.get(ConfigOptions.port);
  app.enableCors();

  // generate ormconfig.json
  generateTypeormConfigFile(configService);

  // Load default data
  setDefaultData(configService);

  await app.listen(port);
}
bootstrap();

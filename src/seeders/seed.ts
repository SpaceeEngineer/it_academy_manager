import { NestFactory } from '@nestjs/core';
import { SeederProvider } from './seeder.provider';
import { SeederModule } from '../seeders/seeder.module';

async function bootstrap() {
  const context = await NestFactory.createApplicationContext(SeederModule);
  const seeder = context.get(SeederProvider);
  seeder.seed();
}
bootstrap();

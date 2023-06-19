import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { swaggerConfig } from './swagger/swaggerConfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  swaggerConfig(app);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT);
}
bootstrap();

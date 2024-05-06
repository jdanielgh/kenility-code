import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as morgan from 'morgan';
import * as morganBody from 'morgan-body';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(morgan('dev'));
  (morganBody as any)(app.getHttpAdapter().getInstance());  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(3000);
}
bootstrap();

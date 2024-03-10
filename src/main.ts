import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

// modules
import { AppModule } from './app.module';

// utils
import { serializeValidationError } from './utils/serialize-validation-error';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory: serializeValidationError,
    }),
  );

  await app.listen(process.env.NEST_PORT);
  console.log(`Application is running on: ${process.env.NEST_PORT}`);
}
bootstrap();

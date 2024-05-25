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

  app.enableCors({
    origin: ['http://localhost:8080', 'http://localhost:8081'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  await app.listen(process.env.NEST_PORT);
  console.log(`Application is running on: ${process.env.NEST_PORT}`);
}
bootstrap();

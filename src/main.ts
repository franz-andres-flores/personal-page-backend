import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT_SERVER', 3000);

  // Configuración de Cors
  app.enableCors({ origin: true, credentials: true });

  // Establecer un prefijo global
  app.setGlobalPrefix('api/');

  // Configuración de Excepciones
  app.useGlobalFilters(new AllExceptionsFilter());

  // Configuración de Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      }
    })
  );

  // Configuraciones de Swagger
  const config = new DocumentBuilder()
    .setTitle('Documentación')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);

  await app.listen(port);
}
bootstrap();

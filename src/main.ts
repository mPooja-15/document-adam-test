import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())

   // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Document Management API')
    .setDescription('APIs for managing documents and users')
    .setVersion('1.0')
    .addBearerAuth() // Enables Authorization header
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Accessible at /api

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

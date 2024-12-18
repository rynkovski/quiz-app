import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Konfiguracja CORS
  app.enableCors();

  // Konfiguracja Swagger
  const config = new DocumentBuilder()
    .setTitle('Quiz API')
    .setDescription('API dokumentacja dla aplikacji Quiz')
    .setVersion('1.0')
    .addTag('quiz')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
}
bootstrap();

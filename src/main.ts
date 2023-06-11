import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './modules/app/app.module';
import { APPLICATION, DESCRIPTION } from './commons/constants/variables.constants';
import { HttpExceptionFilter } from './commons/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'debug', 'warn', 'log'],
  });
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors();
  const PORT = process.env.SERVER_PORT;
  const HOST = process.env.SERVER_HOST;
  const config = new DocumentBuilder()
    .setTitle(APPLICATION)
    .setDescription(DESCRIPTION)
    .setVersion('1.0')
    .addTag(APPLICATION)
    .addBearerAuth({ in: 'header', type: 'http' })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(PORT, () => {
    Logger.log(`Server is running on PORT ${PORT}: http://${HOST}:${PORT}/api `, APPLICATION);
  });
}

bootstrap();

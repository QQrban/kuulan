import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { I18nValidationExceptionFilter, I18nValidationPipe } from 'nestjs-i18n';

async function start() {
  const PORT = process.env.PORT || 5001;
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new I18nValidationPipe());
  app.useGlobalFilters(
    new I18nValidationExceptionFilter({
      detailedErrors: false,
    }),
  );

  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}

start();

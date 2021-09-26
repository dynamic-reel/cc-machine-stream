
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = 80;
  await app.listen(PORT, () => {
    console.log(`MIDDLEWARE Nest app is listening on port ${PORT}.`);
  });
}
bootstrap();

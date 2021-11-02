import { ValidationPipe } from '@nestjs/common'; // 追加
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // 追加
  app.enableCors();
  // await app.listen(3000);
  // 他のホストから参照したい場合は0.0.0.0を追記
  await app.listen(4000, '0.0.0.0');
}
bootstrap();

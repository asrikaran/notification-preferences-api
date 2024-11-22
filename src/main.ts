import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RateLimiterMiddleware } from './middleware/rate-limiter.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Use rate limiting middleware
  app.use(new RateLimiterMiddleware().use);

  await app.listen(3000);
}
bootstrap();

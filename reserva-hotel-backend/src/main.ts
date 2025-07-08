import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenvSafe from 'dotenv-safe';

async function bootstrap() {
  dotenvSafe.config();
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
    }),
  );
  app.use(
    '/auth/login',
    rateLimit({
      windowMs: 10 * 60 * 1000,
      max: 5,
    }),
  );
  app.use((req, res, next) => {
    const allowed = ['GET', 'POST', 'PUT', 'DELETE'];
    if (!allowed.includes(req.method)) {
      return res.status(405).end();
    }
    next();
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/auth/register (POST)', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        nombre: 'Test',
        email: 'test@example.com',
        password: 'StrongP@ss1',
        rol: 'CLIENTE',
      });
    expect(res.status).toBe(201);
  });

  it('/auth/login (POST)', async () => {
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        nombre: 'Login',
        email: 'login@example.com',
        password: 'StrongP@ss1',
        rol: 'CLIENTE',
      });
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'login@example.com', password: 'StrongP@ss1' });
    expect(res.status).toBe(201);
    expect(res.body.accessToken).toBeDefined();
  });
});

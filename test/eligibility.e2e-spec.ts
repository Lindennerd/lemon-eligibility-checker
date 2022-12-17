import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { EligibilityModule } from 'src/eligibility/eligibility.module';
import * as request from 'supertest';

describe('EligibilityController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [EligibilityModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/check (POST)', () => {
    return request(app.getHttpServer())
      .post('/check')
      .expect(200)
      .expect('Hello World!');
  });
});

import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { EligibilityModule } from 'src/eligibility/eligibility.module';
import * as request from 'supertest';

describe('EligibilityController (e2e)', () => {
  let app: INestApplication;
  const test = {
    documentNumber: '14041737706',
    connectionType: 'biPhasic',
    consumptionClass: 'commercial',
    tariffModality: 'conventional',
    consumptionHistoric: [
      3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160, 6941, 4597,
    ],
  };

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
      .send(test)
      .expect(201)
      .expect({
        eligible: true,
        anualCO2SavingEstimate: 5553.24,
      });
  });
});

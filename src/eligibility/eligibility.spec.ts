import { Test, TestingModule } from '@nestjs/testing';
import { Eligibility } from './eligibility';

describe('Eligibility', () => {
  let provider: Eligibility;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Eligibility],
    }).compile();

    provider = module.get<Eligibility>(Eligibility);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});

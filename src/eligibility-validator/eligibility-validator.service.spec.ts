import { Test, TestingModule } from '@nestjs/testing';
import { EligibilityValidatorService } from './eligibility-validator.service';

describe('EligibilityValidatorService', () => {
  let service: EligibilityValidatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EligibilityValidatorService],
    }).compile();

    service = module.get<EligibilityValidatorService>(
      EligibilityValidatorService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

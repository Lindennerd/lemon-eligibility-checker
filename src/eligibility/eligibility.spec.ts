import { Test, TestingModule } from '@nestjs/testing';
import { AnualCo2SavingsCalculatorService } from 'src/usecases/anual-co2-savings-calculator/anual-co2-savings-calculator.service';
import { EligibilityValidatorService } from 'src/usecases/eligibility-validator/eligibility-validator.service';
import { Eligibility } from './eligibility.provider';

describe('Eligibility', () => {
  let provider: Eligibility;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        Eligibility,
        EligibilityValidatorService,
        AnualCo2SavingsCalculatorService,
      ],
    }).compile();

    provider = module.get<Eligibility>(Eligibility);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});

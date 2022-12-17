import { Test, TestingModule } from '@nestjs/testing';
import { AnualCo2SavingsCalculatorService } from './anual-co2-savings-calculator.service';

describe('AnualCo2SavingsCalculatorService', () => {
  let service: AnualCo2SavingsCalculatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnualCo2SavingsCalculatorService],
    }).compile();

    service = module.get<AnualCo2SavingsCalculatorService>(AnualCo2SavingsCalculatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

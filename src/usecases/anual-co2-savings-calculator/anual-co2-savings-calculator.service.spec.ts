import { Test, TestingModule } from '@nestjs/testing';
import { AnualCo2SavingsCalculatorService } from './anual-co2-savings-calculator.service';

describe('AnualCo2SavingsCalculatorService', () => {
  let service: AnualCo2SavingsCalculatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnualCo2SavingsCalculatorService],
    }).compile();

    service = module.get<AnualCo2SavingsCalculatorService>(
      AnualCo2SavingsCalculatorService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  //! FAIR PLAY - é uma prova real da regra de tres
  it('computed value should be decomposable', () => {
    const test = [
      3878, 9760, 5976, 2797, 2481, 5731, 7538, 4392, 7859, 4160, 6941, 4597,
    ];

    const expected = test.reduce((prev, curr) => prev + curr, 0);

    const result = service.computeSavings(test);

    expect(expected).toBe((result * 1000) / 84);
  });
});

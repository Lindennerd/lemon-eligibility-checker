import { Module } from '@nestjs/common';
import { AnualCo2SavingsCalculatorService } from 'src/usecases/anual-co2-savings-calculator/anual-co2-savings-calculator.service';
import { EligibilityValidatorService } from 'src/usecases/eligibility-validator/eligibility-validator.service';
import { EligibilityController } from './eligibility.controller';
import { Eligibility } from './eligibility.provider';

@Module({
  providers: [
    Eligibility,
    EligibilityValidatorService,
    AnualCo2SavingsCalculatorService,
  ],
  controllers: [EligibilityController],
})
export class EligibilityModule {}

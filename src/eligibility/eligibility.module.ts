import { Module } from '@nestjs/common';
import { AnualCo2SavingsCalculatorService } from 'src/anual-co2-savings-calculator/anual-co2-savings-calculator.service';
import { EligibilityValidatorService } from 'src/eligibility-validator/eligibility-validator.service';
import { Eligibility } from './eligibility';
import { EligibilityController } from './eligibility.controller';

@Module({
  providers: [
    Eligibility,
    EligibilityValidatorService,
    AnualCo2SavingsCalculatorService,
  ],
  controllers: [EligibilityController],
})
export class EligibilityModule {}

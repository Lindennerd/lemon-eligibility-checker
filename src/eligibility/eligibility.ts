import { Injectable } from '@nestjs/common';
import { AnualCo2SavingsCalculatorService } from 'src/anual-co2-savings-calculator/anual-co2-savings-calculator.service';
import { EligibilityValidatorService } from 'src/eligibility-validator/eligibility-validator.service';
import {
  EligibilityCheckInput,
  EligibilityCheckOutput,
  EligibleResult,
  NotEligibleResult,
} from './eligibillity.dto';

@Injectable()
export class Eligibility {
  constructor(
    private readonly validator: EligibilityValidatorService,
    private readonly calculator: AnualCo2SavingsCalculatorService,
  ) {}

  check(input: EligibilityCheckInput): EligibilityCheckOutput {
    const notEligibilityReasons = this.validator
      .validateEligibility(input)
      .validateConsumptionClass()
      .validateTariffModality()
      .validateClientConsumption()
      .result();

    if (notEligibilityReasons.length)
      return {
        eligible: false,
        notEligibilityReasons: notEligibilityReasons,
      } as NotEligibleResult;
    else
      return {
        eligible: true,
        anualCO2SavingEstimate: this.calculator.computeSavings(
          input.consumptionHistoric,
        ),
      } as EligibleResult;
  }
}

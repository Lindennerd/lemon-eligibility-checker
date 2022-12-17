import { Module } from '@nestjs/common';
import { AnualCo2SavingsCalculatorService } from './anual-co2-savings-calculator/anual-co2-savings-calculator.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EligibilityValidatorService } from './eligibility-validator/eligibility-validator.service';
import { EligibilityModule } from './eligibility/eligibility.module';

@Module({
  imports: [EligibilityModule],
  controllers: [AppController],
  providers: [
    AppService,
    EligibilityValidatorService,
    AnualCo2SavingsCalculatorService,
  ],
})
export class AppModule {}

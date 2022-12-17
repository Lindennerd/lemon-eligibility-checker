import { Injectable } from '@nestjs/common';
import {
  ConnectionType,
  ConsumptionClass,
  EligibilityCheckInput,
  TariffModalities,
} from 'src/eligibility/eligibillity.dto';

@Injectable()
export class EligibilityValidatorService {
  private readonly minimumRateForSinglePhase = 4000;
  private readonly minimumRateForBiPhase = 5000;
  private readonly minimumRateForThreePhase = 7500;

  validateEligibility(eligibility: EligibilityCheckInput) {
    const notEligibilityReasons: string[] = [];
    const validations = {
      result(): string[] {
        return notEligibilityReasons;
      },

      validateConsumptionClass() {
        const eligibleConsuptionClasses = [
          ConsumptionClass.COMMERCIAL,
          ConsumptionClass.RESIDENTIAL,
          ConsumptionClass.INDUSTRIAL,
        ];

        if (
          !eligibleConsuptionClasses.some(
            (e) => e === eligibility.consumptionClass,
          )
        )
          notEligibilityReasons.push(
            `the consumption class ${eligibility.consumptionClass} is not eligible`,
          );

        return validations;
      },

      validateTariffModality() {
        const eligibleTariffModalities = [
          TariffModalities.CONVENTIONAL,
          TariffModalities.WHITE,
        ];

        if (
          !eligibleTariffModalities.some(
            (e) => e === eligibility.tariffModality,
          )
        )
          notEligibilityReasons.push(
            `the tariff modality ${eligibility.tariffModality} is not eligible`,
          );

        return validations;
      },

      validateClientConsumption() {
        const msg =
          'Consumption average is below requirements for the connection type';
        const consumptionAvg =
          eligibility.consumptionHistoric &&
          eligibility.consumptionHistoric.reduce((prev, current) => {
            return prev + current;
          }, 0) / eligibility.consumptionHistoric.length;

        if (
          eligibility.connectionType === ConnectionType.SINGLEPHASE &&
          consumptionAvg < this.minimumRateForSinglePhase
        )
          notEligibilityReasons.push(msg);

        if (
          eligibility.connectionType === ConnectionType.BIPHASIC &&
          consumptionAvg < this.minimumRateForBiPhase
        )
          notEligibilityReasons.push(msg);

        if (
          (eligibility.connectionType as ConnectionType) ===
            ConnectionType.THREEPHASE &&
          consumptionAvg < this.minimumRateForThreePhase
        )
          notEligibilityReasons.push(msg);

        return validations;
      },
    };

    return validations;
  }
}

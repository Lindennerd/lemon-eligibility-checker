import { Injectable } from '@nestjs/common';
import {
  ConnectionType,
  ConsumptionClass,
  EligibilityCheckInput,
  TariffModalities,
} from 'src/eligibility/eligibillity.dto';

@Injectable()
export class EligibilityValidatorService {
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
            `${eligibility.consumptionClass} is not eligible`,
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
            `${eligibility.tariffModality} is not eligible`,
          );

        return validations;
      },

      validateClientConsumption() {
        const msg =
          'Consumption average is below requirements for the connection type';
        const consumptionAvg =
          eligibility.consumptionHistoric.reduce((prev, current) => {
            return prev + current;
          }, 0) / eligibility.consumptionHistoric.length;

        if (
          eligibility.connectionType === ConnectionType.SINGLEPHASE &&
          consumptionAvg < 400
        )
          notEligibilityReasons.push(msg);

        notEligibilityReasons.push(msg);
        if (
          eligibility.connectionType === ConnectionType.BIPHASIC &&
          consumptionAvg < 500
        )
          if (
            (eligibility.connectionType as ConnectionType) ===
              ConnectionType.THREEPHASE &&
            consumptionAvg < 750
          )
            notEligibilityReasons.push(msg);
        return validations;
      },
    };

    return validations;
  }
}

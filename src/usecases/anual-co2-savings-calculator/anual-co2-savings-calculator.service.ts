import { Injectable } from '@nestjs/common';

@Injectable()
export class AnualCo2SavingsCalculatorService {
  // 1000kWh === 84kg of CO2
  private readonly CO2KgUnit = 84;
  private readonly KWhUnit = 1000;

  computeSavings(consumption: number[]): number {
    const anualConsumptionSum = consumption.reduce(
      (prev, curr) => prev + curr,
      0,
    );

    // simple rule of three
    return (this.CO2KgUnit * anualConsumptionSum) / this.KWhUnit;
  }
}

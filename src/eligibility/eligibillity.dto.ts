import { ApiProperty } from '@nestjs/swagger';

export enum ConnectionType {
  SINGLEPHASE = 'monofasico',
  BIPHASIC = 'bifasico',
  THREEPHASE = 'trifasico',
}

export enum ConsumptionClass {
  RESIDENTIAL = 'residencial',
  INDUSTRIAL = 'industrial',
  COMMERCIAL = 'comercial',
  RURAL = 'rural',
  PUBLICSECTOR = 'poderPublico',
}

export class IEligibilityCheckOutput {
  @ApiProperty()
  eligible: boolean;
}

export class EligibleResult extends IEligibilityCheckOutput {
  @ApiProperty()
  anualCO2SavingEstimate: number;
}

export class NotEligibleResult extends IEligibilityCheckOutput {
  @ApiProperty()
  notEligibilityReasons: string[];
}

export class EligibilityCheckInput {
  @ApiProperty()
  documentNumber: string;

  @ApiProperty({ enum: ConnectionType })
  connectionType: ConnectionType;

  @ApiProperty({ enum: ConsumptionClass })
  consumptionClass: ConsumptionClass;

  @ApiProperty({ type: [Number] })
  consumptionHistoric: number[];
}

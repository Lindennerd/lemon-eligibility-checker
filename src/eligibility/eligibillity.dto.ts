import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayNotEmpty,
  IsEnum,
  IsNumber,
  IsString,
  Matches,
} from 'class-validator';
import { documentNumberPattern } from './constants';

export enum ConnectionType {
  SINGLEPHASE = 'singlePhase',
  BIPHASIC = 'biPhasic',
  THREEPHASE = 'threePhase',
}

export enum ConsumptionClass {
  RESIDENTIAL = 'residential',
  INDUSTRIAL = 'industrial',
  COMMERCIAL = 'commercial',
  RURAL = 'rural',
  PUBLICSECTOR = 'publicSector',
}

export enum TariffModalities {
  BLUE = 'blue',
  WHITE = 'white',
  GREEN = 'green',
  CONVENTIONAL = 'conventional',
}

export class EligibilityCheckOutput {
  @ApiProperty()
  eligible: boolean;
}

export class EligibleResult extends EligibilityCheckOutput {
  @ApiProperty()
  anualCO2SavingEstimate: number;
}

export class NotEligibleResult extends EligibilityCheckOutput {
  @ApiProperty()
  notEligibilityReasons: string[];
}

export class EligibilityCheckInput {
  @ApiProperty()
  @Matches(documentNumberPattern, '', {
    message: 'The document number must be either a CPF or a RG',
  })
  @IsString({ message: 'The document number must be either a CPF or a RG' })
  documentNumber: string;

  @ApiProperty({ enum: ConnectionType })
  @IsEnum(ConnectionType, {
    message: `The connection type must be one of this values ${Object.values(
      ConnectionType,
    )}`,
  })
  connectionType: ConnectionType;

  @ApiProperty({ enum: ConsumptionClass })
  @IsEnum(ConsumptionClass, {
    message: `The consumption class must be one of this values ${Object.values(
      ConsumptionClass,
    )}`,
  })
  consumptionClass: ConsumptionClass;

  @ApiProperty({ enum: TariffModalities })
  @IsEnum(TariffModalities, {
    message: `The tariff modality must be one of this values ${Object.values(
      TariffModalities,
    )}`,
  })
  tariffModality: TariffModalities;

  @ApiProperty({ type: [Number] })
  @IsNumber(
    { allowNaN: false, allowInfinity: true },
    {
      message: 'The consumption history must be an array on numbers',
      each: true,
    },
  )
  @ArrayNotEmpty({
    message:
      'The consumption historic must contains the value of 12 months consumption rate',
  })
  @ArrayMinSize(12, {
    message:
      'The consumption historic must contains the value of 12 months consumption rate',
  })
  @ArrayMaxSize(12, {
    message:
      'The consumption historic must contains the value of 12 months consumption rate',
  })
  consumptionHistoric: number[];
}

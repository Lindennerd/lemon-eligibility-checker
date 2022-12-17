import { Test, TestingModule } from '@nestjs/testing';
import {
  ConnectionType,
  ConsumptionClass,
  EligibilityCheckInput,
  TariffModalities,
} from 'src/eligibility/eligibillity.dto';
import { EligibilityValidatorService } from './eligibility-validator.service';

describe('EligibilityValidatorService', () => {
  let service: EligibilityValidatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EligibilityValidatorService],
    }).compile();

    service = module.get<EligibilityValidatorService>(
      EligibilityValidatorService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should validate a consumption class contained in the eligibleConsuptionClasses array', () => {
    const test = {
      consumptionClass: ConsumptionClass.COMMERCIAL,
    } as EligibilityCheckInput;
    const result = service
      .validateEligibility(test)
      .validateConsumptionClass()
      .result();
    expect(result.length).toBeLessThanOrEqual(0);
  });

  it('should not validate a consumption class not contained in the eligibleConsuptionClasses array', () => {
    const test = {
      consumptionClass: ConsumptionClass.RURAL,
    } as EligibilityCheckInput;
    const result = service
      .validateEligibility(test)
      .validateConsumptionClass()
      .result();
    expect(result.length).toBeGreaterThan(0);
  });

  it('should validate a tariff modality contained in the eligibleTariffModalities array', () => {
    const test = {
      tariffModality: TariffModalities.CONVENTIONAL,
    } as EligibilityCheckInput;
    const result = service
      .validateEligibility(test)
      .validateTariffModality()
      .result();

    expect(result.length).toBeLessThanOrEqual(0);
  });

  it('should not validate a tariff modality not contained in the eligibleTariffModalities array', () => {
    const test = {
      tariffModality: TariffModalities.BLUE,
    } as EligibilityCheckInput;
    const result = service
      .validateEligibility(test)
      .validateTariffModality()
      .result();

    expect(result.length).toBeGreaterThan(0);
  });

  it('should not validate the client consumption when the connection is biphasic and the avg consumption is less than 500kWh', () => {
    const test = {
      connectionType: ConnectionType.BIPHASIC,
      consumptionHistoric: [
        3878, 9760, 2000, 2797, 2481, 1000, 7538, 4392, 1000, 4160, 3000, 4597,
      ],
    } as EligibilityCheckInput;
    const result = service
      .validateEligibility(test)
      .validateClientConsumption()
      .result();

    expect(result.length).toBeGreaterThan(0);
  });

  it('should not validate the client consumption when the connection is singlephase and the avg consumption is less than 400kWh', () => {
    const test = {
      connectionType: ConnectionType.SINGLEPHASE,
      consumptionHistoric: [
        3878, 9760, 2000, 2797, 2481, 1000, 1000, 4392, 1000, 4160, 3000, 4597,
      ],
    } as EligibilityCheckInput;
    const result = service
      .validateEligibility(test)
      .validateClientConsumption()
      .result();

    expect(result.length).toBeGreaterThan(0);
  });

  it('should not validate the client consumption when the connection is singlephase and the avg consumption is less than 400kWh', () => {
    const test = {
      connectionType: ConnectionType.THREEPHASE,
      consumptionHistoric: [
        3878, 9760, 2000, 2797, 2481, 1000, 1000, 4392, 1000, 4160, 3000, 4597,
      ],
    } as EligibilityCheckInput;
    const result = service
      .validateEligibility(test)
      .validateClientConsumption()
      .result();

    expect(result.length).toBeGreaterThan(0);
  });
});

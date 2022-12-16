import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Eligibility } from './eligibility';
import {
  EligibilityCheckInput,
  IEligibilityCheckOutput,
  NotEligibleResult,
} from './eligibillity.dto';

@ApiTags('Eligibility')
@Controller()
export class EligibilityController {
  constructor(private readonly eligibilityProvider: Eligibility) {}

  @ApiResponse({
    status: 200,
    schema: {
      anyOf: [
        {
          title: 'Not Eligible',
          description: 'The Customer is not eligible',
          example: {
            eligible: false,
            notEligibilityReasons: [
              'Classe de consumo não aceita',
              'Modalidade tarifária não aceita',
            ],
          },
        },
        {
          title: 'Eligible',
          description: 'The Customer is eligible',
          example: {
            eligible: true,
            anualCO2SavingEstimate: 5553.24,
          },
        },
      ],
    },
  })
  @ApiResponse({
    status: 400,
    description: 'The data sent to the server is invalid',
  })
  @ApiResponse({
    status: 500,
    description: 'An Internal Server Error occurred',
  })
  @Post('/check')
  CheckEligibility(
    @Body() input: EligibilityCheckInput,
  ): IEligibilityCheckOutput {
    return {
      eligible: false,
      notEligibilityReasons: ['teste', 'teste'],
    } as NotEligibleResult;
  }
}

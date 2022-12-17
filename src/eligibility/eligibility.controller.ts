import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Eligibility } from './eligibility.provider';
import {
  EligibilityCheckInput,
  EligibilityCheckOutput,
} from './eligibillity.dto';

import { ValidationPipe } from './validtion.pipe';

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
    @Body(new ValidationPipe()) input: EligibilityCheckInput,
  ): EligibilityCheckOutput {
    return this.eligibilityProvider.check(input);
  }
}

import { Injectable } from '@nestjs/common';
import {
  EligibilityCheckInput,
  EligibilityCheckOutput,
  NotEligibleResult,
} from './eligibillity.dto';

@Injectable()
export class Eligibility {
  check(input: EligibilityCheckInput): EligibilityCheckOutput {
    return {} as NotEligibleResult;
  }
}

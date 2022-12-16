import { Module } from '@nestjs/common';
import { Eligibility } from './eligibility';
import { EligibilityController } from './eligibility.controller';

@Module({
  providers: [Eligibility],
  controllers: [EligibilityController],
})
export class EligibilityModule {}

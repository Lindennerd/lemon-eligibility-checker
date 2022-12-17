import { Module } from '@nestjs/common';
import { EligibilityModule } from './eligibility/eligibility.module';

@Module({
  imports: [EligibilityModule],
})
export class AppModule {}

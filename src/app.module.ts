import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EligibilityModule } from './eligibility/eligibility.module';

@Module({
  imports: [EligibilityModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

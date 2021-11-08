import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InterestsResolver } from './interests.resolver';
import { InterestsService } from './interests.service';
import { Interest } from './interest';

@Module({
  imports: [TypeOrmModule.forFeature([Interest])],
  providers: [InterestsResolver, InterestsService],
  exports: [InterestsService],
})
export class InterestsModule {}

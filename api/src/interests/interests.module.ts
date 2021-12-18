import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InterestsResolver } from './interests.resolver';
import { InterestsService } from './interests.service';
import { Interest } from './interest';
import { User } from 'src/users/user';

@Module({
  imports: [
    TypeOrmModule.forFeature([Interest]),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [InterestsResolver, InterestsService],
  exports: [InterestsService],
})
export class InterestsModule {}

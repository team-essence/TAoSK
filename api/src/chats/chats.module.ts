import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './chat';
@Module({
  imports: [TypeOrmModule.forFeature([Chat])],
})
export class ChatsModule {}

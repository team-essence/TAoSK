import { Module } from '@nestjs/common';
import { Connection } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot()],
})
export class DatabaseModule {
  constructor(connection: Connection) {
    if (connection.isConnected) {
      console.log('DB connected!');
    }
  }
}

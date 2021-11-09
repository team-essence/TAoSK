import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { QualificationsModule } from './qualifications/qualifications.module';
import { InterestsModule } from './interests/interests.module';
import { User } from './users/user';
import { Qualification } from './qualifications/qualification';
import { Interest } from './interests/interest';

@Module({
  imports: [
    GraphQLModule.forRoot({
      playground: true,
      debug: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db-server',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'taosk_db',
      entities: [User, Qualification, Interest],
      synchronize: true,
    }),
    UsersModule,
    QualificationsModule,
    InterestsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

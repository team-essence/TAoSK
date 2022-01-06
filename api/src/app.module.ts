import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './users/user';
import { Certification } from './certifications/certification';
import { Interest } from './interests/interest';
import { Specie } from './species/specie';
import { Monster } from './monsters/monster';
import { Company } from './companies/company';
import { Occupation } from './occupations/occupation';
import { Project } from './projects/project';
import { Group } from './groups/group';
import { Invitation } from './invitations/invitation';
import { List } from './lists/list';
import { ListSort } from './list-sorts/list-sort';
import { Task } from './tasks/task';
import { Allocation } from './allocations/allocation';
import { Chat } from './chats/chat';
import { GameLog } from './game-logs/game-log';
import { UsersModule } from './users/users.module';
import { CertificationsModule } from './certifications/certifications.module';
import { InterestsModule } from './interests/interests.module';
import { SpeciesModule } from './species/species.module';
import { MonstersModule } from './monsters/monsters.module';
import { CompaniesModule } from './companies/companies.module';
import { OccupationsModule } from './occupations/occupations.module';
import { ProjectsModule } from './projects/projects.module';
import { GroupsModule } from './groups/groups.module';
import { InvitationsModule } from './invitations/invitations.module';
import { ListsModule } from './lists/lists.module';
import { ListSortsModule } from './list-sorts/list-sorts.module';
import { TasksModule } from './tasks/tasks.module';
import { AllocationsModule } from './allocations/allocations.module';
import { ChatsModule } from './chats/chats.module';
import { GameLogsModule } from './game-logs/game-logs.module';
import { EventsGateway } from './events/events.gateway';

dotenv.config();
const host = process.env.DATABASE_HOST;
const username = process.env.DATABASE_USERNAME;
const password = process.env.DATABASE_PASSWORD;

@Module({
  imports: [
    GraphQLModule.forRoot({
      playground: {
        subscriptionEndpoint: 'ws://localhost:3700/graphql',
      },
      debug: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      installSubscriptionHandlers: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host,
      username,
      password,
      port: 3306,
      database: 'taosk_db',
      entities: [
        User,
        Certification,
        Interest,
        Specie,
        Monster,
        Company,
        Occupation,
        Project,
        Group,
        Invitation,
        List,
        ListSort,
        Task,
        Allocation,
        Chat,
        GameLog,
      ],
      synchronize: true,
    }),
    UsersModule,
    CertificationsModule,
    InterestsModule,
    SpeciesModule,
    MonstersModule,
    CompaniesModule,
    OccupationsModule,
    ProjectsModule,
    GroupsModule,
    InvitationsModule,
    ListsModule,
    ListSortsModule,
    TasksModule,
    AllocationsModule,
    ChatsModule,
    GameLogsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`, `.env`],
      load: [],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, EventsGateway],
})
export class AppModule {}

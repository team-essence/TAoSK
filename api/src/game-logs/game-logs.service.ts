import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/projects/project';
import { User } from 'src/users/user';
import { Repository } from 'typeorm';
import { NewLogInput } from './dto/newGameLog.input';
import { GameLog } from './game-log';

@Injectable()
export class GameLogsService {
  constructor(
    @InjectRepository(GameLog)
    private gameLogRepository: Repository<GameLog>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  findByProjectId(project_id: string): Promise<GameLog[]> {
    const logs = this.gameLogRepository.find({
      where: {
        project: {
          id: project_id,
        },
      },
      order: {
        id: 'DESC',
      },
      take: 25,
      relations: ['user'],
    });

    if (!logs) throw new NotFoundException();

    return logs;
  }

  async create(newLog: NewLogInput): Promise<GameLog> {
    const project = await this.projectRepository.findOne(newLog.project_id);
    if (!project) throw new NotFoundException();

    const user = await this.userRepository.findOne(newLog.user_id);
    if (!user) throw new NotFoundException();

    const log = this.gameLogRepository.create({
      context: newLog.context,
      project,
      user,
    });

    await this.gameLogRepository.save(log).catch((err) => {
      new InternalServerErrorException();
    });

    return log;
  }
}

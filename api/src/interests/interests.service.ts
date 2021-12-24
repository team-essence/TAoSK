import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Interest } from './interest';
import { NewInterestInput } from './dto/newInterest.input';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user';

@Injectable()
export class InterestsService {
  constructor(
    @InjectRepository(Interest)
    private interestsRepository: Repository<Interest>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<Interest[]> {
    const interests = this.interestsRepository.find();
    if (!interests) throw new NotFoundException();

    return interests;
  }

  getInterestsByUserIds(user_ids: [string]): Promise<Interest[]> {
    const interests = this.interestsRepository.find({
      where: {
        user: In(user_ids),
      },
      relations: ['user'],
    });
    if (!interests) throw new NotFoundException();

    return interests;
  }

  async create(data: NewInterestInput): Promise<{
    interest: Interest;
    user: User;
  }> {
    const interest = this.interestsRepository.create(data);
    await this.interestsRepository.save(interest).catch((err) => {
      new InternalServerErrorException();
    });

    const user = await this.usersRepository.findOne(data.user_id, {
      relations: [
        'interests',
        'certifications',
        'invitations',
        'invitations.project',
        'groups',
        'groups.project',
        'groups.project.groups',
        'groups.project.groups.user',
        'groups.project.groups.user.occupation',
        'groups.project.monster',
        'groups.project.monster.specie',
        'occupation',
      ],
    });

    return { interest, user };
  }

  async update(
    user_id: string,
    contexts: [string],
  ): Promise<
    Promise<{
      interests: Interest[];
      user: User;
    }>
  > {
    const interests = await this.interestsRepository.find({
      where: {
        user: {
          id: user_id,
        },
      },
    });
    const interestsArray: string[] = new Array(interests.length);

    //削除
    for (let i = 0; i < interests.length; i++) {
      interestsArray[i] = interests[i].context;
      //入力値に一致がなければその項目を削除
      if (!contexts.find((value) => value === interests[i].context)) {
        //一致するものを取得
        const interest = await this.interestsRepository.findOne({
          where: {
            context: interestsArray[i],
            user: {
              id: user_id,
            },
          },
        });

        //取得してきたものを削除
        await this.interestsRepository.remove(interest).catch(() => {
          new InternalServerErrorException();
        });
      }
    }

    //追加
    const user = await this.usersRepository.findOne(user_id);
    for (let j = 0; j < contexts.length; j++) {
      //入力値に一致がなければその項目を追加
      if (!interestsArray.find((value) => value === contexts[j])) {
        const interest = this.interestsRepository.create({
          context: contexts[j],
          user,
        });
        await this.interestsRepository.save(interest).catch((err) => {
          new InternalServerErrorException();
        });
      }
    }

    const updatedInterests = await this.interestsRepository.find({
      where: {
        user: {
          id: user_id,
        },
      },
      relations: ['user'],
    });

    const updatedUser = await this.usersRepository.findOne(user_id, {
      relations: [
        'interests',
        'certifications',
        'invitations',
        'invitations.project',
        'groups',
        'groups.project',
        'groups.project.groups',
        'groups.project.groups.user',
        'groups.project.groups.user.occupation',
        'groups.project.monster',
        'groups.project.monster.specie',
        'occupation',
      ],
    });

    return {
      interests: updatedInterests,
      user: updatedUser,
    };
  }
}

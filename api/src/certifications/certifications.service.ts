import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Certification } from './certification';
import { NewCertificationInput } from './dto/newCertification.input';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user';

@Injectable()
export class CertificationsService {
  constructor(
    @InjectRepository(Certification)
    private CertificationsRepository: Repository<Certification>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  getCertificationsByIds(user_ids: [string]): Promise<Certification[]> {
    const certifications = this.CertificationsRepository.find({
      where: {
        user: In(user_ids),
      },
      relations: ['user'],
    });
    if (!certifications) throw new NotFoundException();

    return certifications;
  }

  async create(data: NewCertificationInput): Promise<Certification> {
    const certification = this.CertificationsRepository.create(data);
    await this.CertificationsRepository.save(certification).catch((err) => {
      new InternalServerErrorException();
    });

    return certification;
  }

  async update(user_id: string, names: [string]): Promise<Certification[]> {
    const certifications = await this.CertificationsRepository.find({
      where: {
        user: {
          id: user_id,
        },
      },
    });
    const certificationsArray: string[] = new Array(certifications.length);

    //削除
    for (let i = 0; i < certifications.length; i++) {
      certificationsArray[i] = certifications[i].name;
      //入力値に一致がなければその項目を削除
      if (!names.find((value) => value === certifications[i].name)) {
        //一致するものを取得
        const certification = await this.CertificationsRepository.findOne({
          where: {
            name: certificationsArray[i],
            user: {
              id: user_id,
            },
          },
        });

        //取得してきたものを削除
        await this.CertificationsRepository.remove(certification).catch(() => {
          new InternalServerErrorException();
        });
      }
    }

    //追加
    const user = await this.usersRepository.findOne(user_id);
    for (let j = 0; j < names.length; j++) {
      //入力値に一致がなければその項目を追加
      if (!certificationsArray.find((value) => value === names[j])) {
        const certification = this.CertificationsRepository.create({
          name: names[j],
          user,
        });
        await this.CertificationsRepository.save(certification).catch((err) => {
          new InternalServerErrorException();
        });
      }
    }

    const updatedCertifications = this.CertificationsRepository.find({
      where: {
        user: {
          id: user_id,
        },
      },
      relations: ['user'],
    });

    return updatedCertifications;
  }
}

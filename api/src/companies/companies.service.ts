import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './company';
import { NewCompanyInput } from './dto/newCompany.input';
@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  getCompany(uid: string): Promise<Company> {
    const company = this.companyRepository.findOne(uid);
    if (!company) throw new NotFoundException();
    return company;
  }

  async addCompany(newCompany: NewCompanyInput): Promise<Company> {
    const company = this.companyRepository.create({
      uid: newCompany.uid,
      name: newCompany.name,
    });
    await this.companyRepository.save(company).catch((err) => {
      throw err;
    });

    return company;
  }
}

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CompaniesService } from './companies.service';
import { Company } from './company';
import { PubSub } from 'graphql-subscriptions';
import { NewCompanyInput } from './dto/newCompany.input';
import { NotFoundException } from '@nestjs/common';
@Resolver((of) => Company)
export class CompaniesResolver {
  private pubSub: PubSub;
  constructor(private companiesService: CompaniesService) {
    this.pubSub = new PubSub();
  }

  @Query(() => Company)
  async getCompany(@Args({ name: 'uid' }) uid: string) {
    const company = await this.companiesService.getCompany(uid);
    if (!company) {
      throw new NotFoundException();
    }
    return company;
  }

  @Mutation(() => Company)
  public async addCompany(
    @Args({ name: 'newCompany' }) newCompany: NewCompanyInput,
  ) {
    return await this.companiesService.addCompany(newCompany).catch((err) => {
      throw err;
    });
  }
}

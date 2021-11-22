import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Certification } from './certification';
import { CertificationsService } from './certifications.service';
import { NewCertificationInput } from './dto/newCertification.input';

@Resolver(() => Certification)
export class CertificationsResolver {
  constructor(private certificationService: CertificationsService) {}

  @Query(() => [Certification])
  public async certifications(
    @Args({ name: 'user_ids', type: () => [String] }) user_ids: [string],
  ) {
    const certifications =
      await this.certificationService.getCertificationsByIds(user_ids);
    if (!certifications) {
      throw new NotFoundException(user_ids);
    }
    return certifications;
  }

  @Mutation(() => Certification)
  public async addCertification(
    @Args('newCertification') newCertification: NewCertificationInput,
  ): Promise<Certification> {
    return this.certificationService.create(newCertification).catch((err) => {
      throw err;
    });
  }
}

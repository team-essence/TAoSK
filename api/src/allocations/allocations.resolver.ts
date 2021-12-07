import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Allocation } from './allocation';
import { AllocationsService } from './allocations.service';
import { NewAllocationInput } from './dto/newAllocation.input';

@Resolver()
export class AllocationsResolver {
  constructor(private allocationService: AllocationsService) {}

  @Mutation(() => Allocation)
  public async createAllocation(
    @Args({ name: 'newAllocation' }) newAllocation: NewAllocationInput,
  ): Promise<Allocation> {
    return await this.allocationService
      .create({ newAllocation })
      .catch((err) => {
        throw err;
      });
  }
}

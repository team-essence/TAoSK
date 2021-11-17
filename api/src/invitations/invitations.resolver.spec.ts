import { Test, TestingModule } from '@nestjs/testing';
import { InvitationsResolver } from './invitations.resolver';

describe('InvitationsResolver', () => {
  let resolver: InvitationsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvitationsResolver],
    }).compile();

    resolver = module.get<InvitationsResolver>(InvitationsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

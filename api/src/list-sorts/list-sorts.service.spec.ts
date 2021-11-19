import { Test, TestingModule } from '@nestjs/testing';
import { ListSortsService } from './list-sorts.service';

describe('ListSortsService', () => {
  let service: ListSortsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListSortsService],
    }).compile();

    service = module.get<ListSortsService>(ListSortsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

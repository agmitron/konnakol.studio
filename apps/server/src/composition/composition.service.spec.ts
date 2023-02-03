import { Test, TestingModule } from '@nestjs/testing';
import { CompositionService } from './composition.service';

describe('CompositionService', () => {
  let service: CompositionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompositionService],
    }).compile();

    service = module.get<CompositionService>(CompositionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

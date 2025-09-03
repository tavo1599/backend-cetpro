import { Test, TestingModule } from '@nestjs/testing';
import { HeroSlidesService } from './hero-slides.service';

describe('HeroSlidesService', () => {
  let service: HeroSlidesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HeroSlidesService],
    }).compile();

    service = module.get<HeroSlidesService>(HeroSlidesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

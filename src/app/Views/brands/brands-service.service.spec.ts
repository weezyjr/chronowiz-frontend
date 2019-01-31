import { TestBed } from '@angular/core/testing';

import { BrandsService } from './brands.service';

describe('BrandsServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BrandsService = TestBed.get(BrandsService);
    expect(service).toBeTruthy();
  });
});

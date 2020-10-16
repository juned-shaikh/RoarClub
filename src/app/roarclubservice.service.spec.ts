import { TestBed } from '@angular/core/testing';

import { RoarclubserviceService } from './roarclubservice.service';

describe('RoarclubserviceService', () => {
  let service: RoarclubserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoarclubserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

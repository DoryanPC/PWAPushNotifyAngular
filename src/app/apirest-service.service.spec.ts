import { TestBed } from '@angular/core/testing';

import { APIRestServiceService } from './apirest-service.service';

describe('APIRestServiceService', () => {
  let service: APIRestServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(APIRestServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

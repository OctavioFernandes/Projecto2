import { TestBed } from '@angular/core/testing';

import { LogedguardService } from './logedguard.service';

describe('LogedguardService', () => {
  let service: LogedguardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogedguardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

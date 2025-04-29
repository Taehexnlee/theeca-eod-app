import { TestBed } from '@angular/core/testing';

import { EodReportService } from './eod-report.service';

describe('EodReportService', () => {
  let service: EodReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EodReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

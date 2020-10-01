/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LogicSharedService } from './LogicShared.service';

describe('Service: LogicShared', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LogicSharedService]
    });
  });

  it('should ...', inject([LogicSharedService], (service: LogicSharedService) => {
    expect(service).toBeTruthy();
  }));
});

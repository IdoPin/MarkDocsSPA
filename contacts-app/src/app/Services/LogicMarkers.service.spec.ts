/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LogicMarkersService } from './LogicMarkers.service';

describe('Service: LogicMarkers', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LogicMarkersService]
    });
  });

  it('should ...', inject([LogicMarkersService], (service: LogicMarkersService) => {
    expect(service).toBeTruthy();
  }));
});

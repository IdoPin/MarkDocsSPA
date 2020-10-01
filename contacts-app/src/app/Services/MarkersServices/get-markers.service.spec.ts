/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GetMarkersService } from './get-markers.service';

describe('Service: GetMarkers', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetMarkersService]
    });
  });

  it('should ...', inject([GetMarkersService], (service: GetMarkersService) => {
    expect(service).toBeTruthy();
  }));
});

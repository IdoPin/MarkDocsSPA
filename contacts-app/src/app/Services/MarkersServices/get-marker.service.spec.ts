/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GetMarkerService } from './get-marker.service';

describe('Service: GetMarker', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetMarkerService]
    });
  });

  it('should ...', inject([GetMarkerService], (service: GetMarkerService) => {
    expect(service).toBeTruthy();
  }));
});

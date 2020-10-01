/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CreateMarkerService } from './create-marker.service';

describe('Service: CreateMarker', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateMarkerService]
    });
  });

  it('should ...', inject([CreateMarkerService], (service: CreateMarkerService) => {
    expect(service).toBeTruthy();
  }));
});

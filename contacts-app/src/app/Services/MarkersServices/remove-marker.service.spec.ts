/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RemoveMarkerService } from './remove-marker.service';

describe('Service: RemoveMarker', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RemoveMarkerService]
    });
  });

  it('should ...', inject([RemoveMarkerService], (service: RemoveMarkerService) => {
    expect(service).toBeTruthy();
  }));
});

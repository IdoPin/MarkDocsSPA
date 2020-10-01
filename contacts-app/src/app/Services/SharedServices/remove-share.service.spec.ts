/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RemoveShareService } from './remove-share.service';

describe('Service: RemoveShare', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RemoveShareService]
    });
  });

  it('should ...', inject([RemoveShareService], (service: RemoveShareService) => {
    expect(service).toBeTruthy();
  }));
});

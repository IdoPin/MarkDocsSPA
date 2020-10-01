/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CreateShareService } from './create-share.service';

describe('Service: CreateShare', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateShareService]
    });
  });

  it('should ...', inject([CreateShareService], (service: CreateShareService) => {
    expect(service).toBeTruthy();
  }));
});

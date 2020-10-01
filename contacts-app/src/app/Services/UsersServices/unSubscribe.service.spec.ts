/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UnSubscribeService } from './unSubscribe.service';

describe('Service: UnSubscribe', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnSubscribeService]
    });
  });

  it('should ...', inject([UnSubscribeService], (service: UnSubscribeService) => {
    expect(service).toBeTruthy();
  }));
});

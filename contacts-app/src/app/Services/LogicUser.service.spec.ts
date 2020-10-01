/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LogicUserService } from './LogicUser.service';

describe('Service: LogicUser', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LogicUserService]
    });
  });

  it('should ...', inject([LogicUserService], (service: LogicUserService) => {
    expect(service).toBeTruthy();
  }));
});

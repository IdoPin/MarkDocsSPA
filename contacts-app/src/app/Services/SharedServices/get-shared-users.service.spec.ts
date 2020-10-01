/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GetSharedUsersService } from './get-shared-users.service';

describe('Service: GetSharedUsers', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetSharedUsersService]
    });
  });

  it('should ...', inject([GetSharedUsersService], (service: GetSharedUsersService) => {
    expect(service).toBeTruthy();
  }));
});

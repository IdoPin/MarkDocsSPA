/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LogicDocumentsService } from './LogicDocuments.service';

describe('Service: LogicDocuments', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LogicDocumentsService]
    });
  });

  it('should ...', inject([LogicDocumentsService], (service: LogicDocumentsService) => {
    expect(service).toBeTruthy();
  }));
});

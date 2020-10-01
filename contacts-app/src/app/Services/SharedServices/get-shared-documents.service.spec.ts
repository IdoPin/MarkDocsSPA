/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GetSharedDocumentsService } from './get-shared-documents.service';

describe('Service: GetSharedDocuments', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetSharedDocumentsService]
    });
  });

  it('should ...', inject([GetSharedDocumentsService], (service: GetSharedDocumentsService) => {
    expect(service).toBeTruthy();
  }));
});

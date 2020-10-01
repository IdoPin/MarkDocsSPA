/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GetDocumentsService } from './get-documents.service';

describe('Service: GetDocuments', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetDocumentsService]
    });
  });

  it('should ...', inject([GetDocumentsService], (service: GetDocumentsService) => {
    expect(service).toBeTruthy();
  }));
});

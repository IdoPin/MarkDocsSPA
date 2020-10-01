/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GetDocumentService } from './get-document.service';

describe('Service: GetDocument', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetDocumentService]
    });
  });

  it('should ...', inject([GetDocumentService], (service: GetDocumentService) => {
    expect(service).toBeTruthy();
  }));
});

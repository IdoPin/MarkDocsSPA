/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CreateDocumentService } from './create-document.service';

describe('Service: CreateDocument', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateDocumentService]
    });
  });

  it('should ...', inject([CreateDocumentService], (service: CreateDocumentService) => {
    expect(service).toBeTruthy();
  }));
});

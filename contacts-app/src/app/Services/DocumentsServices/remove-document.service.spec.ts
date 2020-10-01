/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RemoveDocumentService } from './remove-document.service';

describe('Service: RemoveDocument', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RemoveDocumentService]
    });
  });

  it('should ...', inject([RemoveDocumentService], (service: RemoveDocumentService) => {
    expect(service).toBeTruthy();
  }));
});

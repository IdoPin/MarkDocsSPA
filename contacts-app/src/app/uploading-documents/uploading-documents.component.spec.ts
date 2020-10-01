import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadingDocumentsComponent } from './uploading-documents.component';

describe('UploadingDocumentsComponent', () => {
  let component: UploadingDocumentsComponent;
  let fixture: ComponentFixture<UploadingDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadingDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadingDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

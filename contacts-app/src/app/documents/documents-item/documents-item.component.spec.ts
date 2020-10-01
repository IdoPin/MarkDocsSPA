import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsItemComponent } from './documents-item.component';

describe('DocumentsItemComponent', () => {
  let component: DocumentsItemComponent;
  let fixture: ComponentFixture<DocumentsItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentsItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

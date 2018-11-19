import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCollectionFormComponent } from './add-collection-form.component';

describe('AddCollectionFormComponent', () => {
  let component: AddCollectionFormComponent;
  let fixture: ComponentFixture<AddCollectionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCollectionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCollectionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

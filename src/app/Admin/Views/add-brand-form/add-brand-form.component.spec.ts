import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBrandFormComponent } from './add-brand-form.component';

describe('AddBrandFormComponent', () => {
  let component: AddBrandFormComponent;
  let fixture: ComponentFixture<AddBrandFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBrandFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBrandFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

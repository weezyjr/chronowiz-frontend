import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCaliberFormComponent } from './add-caliber-form.component';

describe('AddCaliberFormComponent', () => {
  let component: AddCaliberFormComponent;
  let fixture: ComponentFixture<AddCaliberFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCaliberFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCaliberFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

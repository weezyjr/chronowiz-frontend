import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddressInfoComponent } from './edit-address-info.component';

describe('EditAddressInfoComponent', () => {
  let component: EditAddressInfoComponent;
  let fixture: ComponentFixture<EditAddressInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAddressInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAddressInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

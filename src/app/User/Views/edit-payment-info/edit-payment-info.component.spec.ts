import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPaymentInfoComponent } from './edit-payment-info.component';

describe('EditPaymentInfoComponent', () => {
  let component: EditPaymentInfoComponent;
  let fixture: ComponentFixture<EditPaymentInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPaymentInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPaymentInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

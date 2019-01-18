import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterResistanceComponent } from './water-resistance.component';

describe('WaterResistanceComponent', () => {
  let component: WaterResistanceComponent;
  let fixture: ComponentFixture<WaterResistanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaterResistanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterResistanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

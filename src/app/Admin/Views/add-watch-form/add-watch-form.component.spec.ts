import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWatchFormComponent } from './add-watch-form.component';

describe('AddWatchFormComponent', () => {
  let component: AddWatchFormComponent;
  let fixture: ComponentFixture<AddWatchFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWatchFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWatchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

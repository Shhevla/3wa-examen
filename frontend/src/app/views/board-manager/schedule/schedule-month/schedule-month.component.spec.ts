import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleMonthComponent } from './schedule-month.component';

describe('ScheduleMonthComponent', () => {
  let component: ScheduleMonthComponent;
  let fixture: ComponentFixture<ScheduleMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleMonthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

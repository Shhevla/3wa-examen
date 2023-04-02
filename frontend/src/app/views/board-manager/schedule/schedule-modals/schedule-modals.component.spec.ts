import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleModalsComponent } from './schedule-modals.component';

describe('ScheduleModalsComponent', () => {
  let component: ScheduleModalsComponent;
  let fixture: ComponentFixture<ScheduleModalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleModalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleModalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

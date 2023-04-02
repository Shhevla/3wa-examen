import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabinetOptionComponent } from './cabinet-option.component';

describe('CabinetOptionComponent', () => {
  let component: CabinetOptionComponent;
  let fixture: ComponentFixture<CabinetOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CabinetOptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CabinetOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

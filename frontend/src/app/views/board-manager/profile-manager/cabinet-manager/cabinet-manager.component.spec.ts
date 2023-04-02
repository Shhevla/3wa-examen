import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabinetManagerComponent } from './cabinet-manager.component';

describe('CabinetManagerComponent', () => {
  let component: CabinetManagerComponent;
  let fixture: ComponentFixture<CabinetManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CabinetManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CabinetManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

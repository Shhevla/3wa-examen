import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeModuleManagerComponent } from './home-module-manager.component';

describe('HomeModuleManagerComponent', () => {
  let component: HomeModuleManagerComponent;
  let fixture: ComponentFixture<HomeModuleManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeModuleManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeModuleManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

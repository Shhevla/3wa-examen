import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyPractitionersComponent } from './modify-practitioners.component';

describe('ModifyPractitionersComponent', () => {
  let component: ModifyPractitionersComponent;
  let fixture: ComponentFixture<ModifyPractitionersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyPractitionersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyPractitionersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

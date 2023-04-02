import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PractitionersModalComponent } from './practitioners-form.component';

describe('PractitionersModalComponent', () => {
  let component: PractitionersModalComponent;
  let fixture: ComponentFixture<PractitionersModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PractitionersModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PractitionersModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

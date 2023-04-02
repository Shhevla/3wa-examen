import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyMemberComponent } from './modify-member.component';

describe('ModifyMemberComponent', () => {
  let component: ModifyMemberComponent;
  let fixture: ComponentFixture<ModifyMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

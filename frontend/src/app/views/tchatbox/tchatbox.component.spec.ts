import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TchatboxComponent } from './tchatbox.component';

describe('TchatboxComponent', () => {
  let component: TchatboxComponent;
  let fixture: ComponentFixture<TchatboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TchatboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TchatboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

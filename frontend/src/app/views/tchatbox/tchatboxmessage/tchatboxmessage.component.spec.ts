import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TchatboxmessageComponent } from './tchatboxmessage.component';

describe('TchatboxmessageComponent', () => {
  let component: TchatboxmessageComponent;
  let fixture: ComponentFixture<TchatboxmessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TchatboxmessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TchatboxmessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

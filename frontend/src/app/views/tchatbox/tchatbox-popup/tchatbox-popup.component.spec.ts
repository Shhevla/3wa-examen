import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TchatboxPopupComponent } from './tchatbox-popup.component';

describe('TchatboxPopupComponent', () => {
  let component: TchatboxPopupComponent;
  let fixture: ComponentFixture<TchatboxPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TchatboxPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TchatboxPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

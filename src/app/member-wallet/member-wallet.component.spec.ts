import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberWalletComponent } from './member-wallet.component';

describe('MemberWalletComponent', () => {
  let component: MemberWalletComponent;
  let fixture: ComponentFixture<MemberWalletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberWalletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberBankDetailsComponent } from './member-bank-details.component';

describe('MemberBankDetailsComponent', () => {
  let component: MemberBankDetailsComponent;
  let fixture: ComponentFixture<MemberBankDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberBankDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberBankDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

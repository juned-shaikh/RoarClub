import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberRegistrationDetailsComponent } from './member-registration-details.component';

describe('MemberRegistrationDetailsComponent', () => {
  let component: MemberRegistrationDetailsComponent;
  let fixture: ComponentFixture<MemberRegistrationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberRegistrationDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberRegistrationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

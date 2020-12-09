import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberLoginSignupFormComponent } from './member-login-signup-form.component';

describe('MemberLoginSignupFormComponent', () => {
  let component: MemberLoginSignupFormComponent;
  let fixture: ComponentFixture<MemberLoginSignupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberLoginSignupFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberLoginSignupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

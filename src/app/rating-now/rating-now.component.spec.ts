import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingNowComponent } from './rating-now.component';

describe('RatingNowComponent', () => {
  let component: RatingNowComponent;
  let fixture: ComponentFixture<RatingNowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingNowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingNowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

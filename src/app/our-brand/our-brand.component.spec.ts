import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OurBrandComponent } from './our-brand.component';

describe('OurBrandComponent', () => {
  let component: OurBrandComponent;
  let fixture: ComponentFixture<OurBrandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OurBrandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OurBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderViewDetailsComponent } from './order-view-details.component';

describe('OrderViewDetailsComponent', () => {
  let component: OrderViewDetailsComponent;
  let fixture: ComponentFixture<OrderViewDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderViewDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderViewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

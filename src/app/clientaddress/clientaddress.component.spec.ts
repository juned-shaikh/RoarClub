import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { from } from 'rxjs';

import { ClientaddressComponent } from './clientaddress.component';
describe('ClientaddressComponent', () => {
  let component: ClientaddressComponent;
  let fixture: ComponentFixture<ClientaddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientaddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientaddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

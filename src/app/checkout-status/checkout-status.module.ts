import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule }    from '@angular/forms';
import { CheckoutStatusRoutingModule } from './checkout-status-routing.module';
import { CheckoutStatusComponent } from './checkout-status.component';

@NgModule({
  declarations: [
    CheckoutStatusComponent
  ],
  imports: [
    CommonModule,
    CheckoutStatusRoutingModule,ReactiveFormsModule, FormsModule
  ]
})
export class CheckoutStatusModule { }

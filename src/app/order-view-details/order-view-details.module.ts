import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule }    from '@angular/forms';
import { OrderViewDetailsRoutingModule } from './order-view-details-routing.module';
import { OrderViewDetailsComponent} from './order-view-details.component';

@NgModule({
  declarations: [
    OrderViewDetailsComponent
  ],
  imports: [
    CommonModule,
    OrderViewDetailsRoutingModule,ReactiveFormsModule, FormsModule
  ]
})
export class OrderViewDetailsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule }    from '@angular/forms';
import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent} from './order.component';
import {MatIconModule} from '@angular/material/icon';



@NgModule({
  declarations: [
    OrderComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    ReactiveFormsModule,MatIconModule, FormsModule
  ]
})
export class OrderModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderViewDetailsComponent } from './order-view-details.component';

const routes: Routes = [
  {
    path:'',
    component:OrderViewDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderViewDetailsRoutingModule { }

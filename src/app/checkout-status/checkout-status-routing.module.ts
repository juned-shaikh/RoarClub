import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckoutStatusComponent} from './checkout-status.component';
const routes: Routes = [
  {
    path:'',
    component:CheckoutStatusComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutStatusRoutingModule { }

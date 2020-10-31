import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule }    from '@angular/forms';
import { WishlistRoutingModule } from './wishlist-routing.module';
import { WishlistComponent} from './wishlist.component';


@NgModule({
  declarations: [
    WishlistComponent
  ],
  imports: [
    CommonModule,
    WishlistRoutingModule,
    ReactiveFormsModule, FormsModule
  ]
})
export class WishlistModule { }

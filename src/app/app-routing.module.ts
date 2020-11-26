import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {CategoryPageComponent} from './category-page/category-page.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {ProductViewComponent} from './product-view/product-view.component';
import { UserloginComponent } from './userlogin/userlogin.component';
import { RegistrationComponent } from './registration/registration.component';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OurBrandComponent } from './our-brand/our-brand.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { OrderViewDetailsComponent } from './order-view-details/order-view-details.component';
import { ReviewratingComponent } from './reviewrating/reviewrating.component';
import { RatingComponent } from './rating/rating.component';
import { RatingNowComponent } from './rating-now/rating-now.component';
 
const routes: Routes = [
  { path: "",  pathMatch: "prefix", 
      component:HeaderComponent,
    children: [
      {path : '', component : HomeComponent},
      {path : 'Home', component : HomeComponent},
      {path: 'category-page/', component:CategoryPageComponent },
      {path: 'category-page/:id1/:id', component:CategoryPageComponent },
      {path: 'category-page/:id', component:CategoryPageComponent },
      {path : "product-view/:id", component : ProductViewComponent},  
      {
        path : "login", component:UserloginComponent
      },
      {
        path:"register", component:RegistrationComponent
      },
      {
        path:"our-brand", component:OurBrandComponent
      },
      {
        path:"cart",
        component:AddToCartComponent
      },
      {
        path:"checkout",
        component:CheckoutComponent
      },
      {
        path:"client-info",
        component:ProfilePageComponent,
       
      }, {
        path: "order-details/:id",
        component:OrderViewDetailsComponent,
      },
     
      {
        path : "reviewrating",
        component:ReviewratingComponent
      },
      { path: "rating", component: RatingComponent},
      { path: "rating-now", component: RatingNowComponent},
    ],
 },




 
  // { path:'',  pathMatch:'full'},
 
//   {  path:"header",component : HeaderComponent },
//   {  path:"home",component : HomeComponent },
//   {  path:"footer",component : FooterComponent },
//   {  path:"category-page",component : CategoryPageComponent },
//   { path:"product-view",component : ProductViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

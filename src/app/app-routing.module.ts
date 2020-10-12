import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {CategoryPageComponent} from './category-page/category-page.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import { ProductViewComponent } from './product-view/product-view.component';

const routes: Routes = [
  {
    path: "",
    component: HeaderComponent,
    pathMatch: "prefix",
    children: [
      { path: "", component: HomeComponent },
      { path: "home", component: HomeComponent },
      {  path:"footer",component : FooterComponent },
      {  path:"category-page",component : CategoryPageComponent },
      {path : "product-view", component : ProductViewComponent}
    ]
  }
  // { path:'',  pathMatch:'full'},
 
  // {  path:"header",component : HeaderComponent },
  // {  path:"home",component : HomeComponent },
  // {  path:"footer",component : FooterComponent },
  // {  path:"category-page",component : CategoryPageComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

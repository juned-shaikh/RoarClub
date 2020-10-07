import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {CategoryPageComponent} from './category-page/category-page.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';

const routes: Routes = [
  { path:'', redirectTo:'/home', pathMatch:'full'},
 
  {  path:"header",component : HeaderComponent },
  {  path:"home",component : HomeComponent },
  {  path:"footer",component : FooterComponent },
  {  path:"category-page",component : CategoryPageComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

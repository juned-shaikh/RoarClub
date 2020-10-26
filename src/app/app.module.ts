import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { HomeComponent } from './home/home.component';
import { CategoryPageComponent } from './category-page/category-page.component';
import { ProductViewComponent } from './product-view/product-view.component';
 //import { MatSnackBarModule} from "@angular/material";
 import {MatSnackBarModule} from '@angular/material/snack-bar';
 import { from } from 'rxjs';


import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './_guards';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
 import { JwtInterceptor, ErrorInterceptor } from './_helpers';
 import { AlertComponent } from './_directives';
import { ReactiveFormsModule, FormsModule }    from '@angular/forms';
import { AlertService, AuthenticationService, UserService} from './_services';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

   import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatIconModule} from '@angular/material/icon';
   import {MatTooltipModule} from '@angular/material/tooltip';

   import {MatSortModule} from '@angular/material/sort';

import {MatProgressBarModule} from '@angular/material/progress-bar';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { environment } from '../environments/environment'; 

import { AsyncPipe } from '../../node_modules/@angular/common';

import { HashLocationStrategy, LocationStrategy , PathLocationStrategy} from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    // HomeComponent,
    CategoryPageComponent,
    ProductViewComponent,
   
   
    AppComponent,
   
    FooterComponent,
   
    LoginComponent,
   
    RegistrationComponent,
   
    AddToCartComponent,
   
    CheckoutPageComponent,
   
    ProfilePageComponent,
   


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    
  
    BrowserModule,
    //MatTooltipModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    
    HttpClientModule,
   // MatNativeDateModule,
    ReactiveFormsModule, 
    FormsModule,
    MatSnackBarModule,
    BrowserModule,
    BrowserAnimationsModule,
  
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    
    NgbModule,
    
    
    RecaptchaModule,  
    RecaptchaFormsModule, 

  ],
  providers: [
    AlertService,
    AuthGuard,
    AuthenticationService,

    UserService,
   // MessagingService,
    AsyncPipe,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
   { provide: LocationStrategy,  useClass: PathLocationStrategy},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 

  constructor(){

    
  }

}

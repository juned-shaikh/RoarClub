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
   import {MatCardModule} from '@angular/material/card';
   import {MatSortModule} from '@angular/material/sort';
   import {MatRadioModule} from '@angular/material/radio';

import {MatProgressBarModule} from '@angular/material/progress-bar';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { environment } from '../environments/environment'; 

import { AsyncPipe } from '../../node_modules/@angular/common';

import { HashLocationStrategy, LocationStrategy , PathLocationStrategy} from '@angular/common';
import { RegistrationComponent } from './registration/registration.component';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { UserloginComponent } from './userlogin/userlogin.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
<<<<<<< HEAD
import { ProfilePageComponent } from './profile-page/profile-page.component';
=======
import { CheckoutComponent } from './checkout/checkout.component';
import { CheckoutStatusComponent } from './checkout-status/checkout-status.component';
>>>>>>> 5395eceb24de8a96e6fa9665b2eb2017a16373db


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    // HomeComponent,
    CategoryPageComponent,
    ProductViewComponent,
    CheckoutStatusComponent,
    CheckoutComponent,
    AppComponent,
   
    FooterComponent,
    RegistrationComponent,
   
    AddToCartComponent,
   
    UserloginComponent,
    CheckoutPageComponent,
   
    ProfilePageComponent,
   


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTooltipModule,
    MatIconModule,
    MatCardModule,
    MatRadioModule,
    BrowserModule,
    //MatTooltipModule,
    AppRoutingModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatInputModule,
    // MatCardModule,
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

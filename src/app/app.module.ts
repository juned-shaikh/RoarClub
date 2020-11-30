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
import {MatListModule} from '@angular/material/list';

import { AsyncPipe } from '../../node_modules/@angular/common';

import { HashLocationStrategy, LocationStrategy , PathLocationStrategy} from '@angular/common';
import { RegistrationComponent } from './registration/registration.component';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { UserloginComponent } from './userlogin/userlogin.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';

import { ProfilePageComponent } from './profile-page/profile-page.component';

import { CheckoutComponent } from './checkout/checkout.component';
import { CheckoutStatusComponent } from './checkout-status/checkout-status.component';

import {MatButtonModule} from '@angular/material/button';

import { OurBrandComponent } from './our-brand/our-brand.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { AccountInfoComponent } from './account-info/account-info.component';
import { OrderComponent } from './order/order.component';
import { OrderViewDetailsComponent } from './order-view-details/order-view-details.component';
import { AddressComponent } from './address/address.component';
import { ClientaddressComponent } from './clientaddress/clientaddress.component';
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
//import { NgxImageZoomModule } from 'ngx-image-zoom';
//import { NgxImgZoomService } from "ngx-img-zoom";
import { NgxImgZoomModule  } from 'ngx-img-zoom';
import { ZoomComponent } from './product-view/zoom.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ReviewratingComponent } from './reviewrating/reviewrating.component';
import { RatingComponent } from './rating/rating.component';
import { RatingNowComponent } from './rating-now/rating-now.component';
// import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { GalleryModule } from 'ng-gallery';
import { LightboxModule } from 'ng-gallery/lightbox';
import { PinchZoomModule } from 'ngx-pinch-zoom';
import { OrderHistoryComponent } from './order-history/order-history.component';

@NgModule({
  declarations: [
    ReviewratingComponent,
    RatingNowComponent,
    RatingComponent,
    AppComponent,
    ClientaddressComponent,
    CustomerProfileComponent,
    HeaderComponent,
    OrderHistoryComponent,
    AddressComponent,
    // ChangePasswordComponent,
    HomeComponent,
    AccountInfoComponent,
    OrderViewDetailsComponent,
    FooterComponent,
    // HomeComponent,
    CategoryPageComponent,
    ProductViewComponent,
    CheckoutStatusComponent,
    CheckoutComponent,
    AppComponent,
    OurBrandComponent,
    FooterComponent,
    RegistrationComponent,
    OrderComponent,
    AddToCartComponent,
   
    UserloginComponent,
    CheckoutPageComponent,
   
    ProfilePageComponent,
   
    WishlistComponent,
       ZoomComponent,
       GalleryComponent,
      


  ],
  imports: [

    PinchZoomModule ,
    GalleryModule,
    LightboxModule,
    
     FormsModule, NgxImgZoomModule ,
     RouterModule,
    BrowserModule,
    AppRoutingModule,
    MatTooltipModule,
    MatToolbarModule,
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
    MatButtonModule,
    FormsModule,
    MatSnackBarModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
 
    FormsModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    
    NgbModule,
    
    
    RecaptchaModule,  
    RecaptchaFormsModule, 
    MatListModule

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

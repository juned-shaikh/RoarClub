import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { HashLocationStrategy, LocationStrategy , PathLocationStrategy} from '@angular/common';
// import { HomeComponent } from './home/home.component';
import { CategoryPageComponent } from './category-page/category-page.component';
import { ProductViewComponent } from './product-view/product-view.component';
 //import { MatSnackBarModule} from "@angular/material";
 import { HomeComponent } from './home/home.component';
 import { from } from 'rxjs';


import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './_guards';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
 import { JwtInterceptor, ErrorInterceptor } from './_helpers';
 import { AlertComponent } from './_directives';
import { ReactiveFormsModule, FormsModule }    from '@angular/forms';
import { AlertService, AuthenticationService, UserService} from './_services';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { FlexLayoutModule } from '@angular/flex-layout';
 

   import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatIconModule} from '@angular/material/icon';
   import {MatTooltipModule} from '@angular/material/tooltip';
  //  import { NgOtpInputModule } from  'ng-otp-input';
  //  import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
   import {MatSortModule} from '@angular/material/sort';
//    import { 
//   MatCardModule,   MatStepperModule,      MatDialogModule,   MatRippleModule, MatDatepickerModule, MatNativeDateModule, MatChipsModule ,MatPaginatorModule
// } from '@angular/material';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AsyncPipe } from '../../node_modules/@angular/common';
// import {MatExpansionModule} from '@angular/material/expansion';
// import { ContactUsComponent } from './contact-us/contact-us.component';
// import { LoginComponent } from './login/login.component';
// import { RegisterComponent } from './register/register.component';
// import { AdminLoginComponent } from './admin-login/admin-login.component';
// import { HashLocationStrategy, LocationStrategy , PathLocationStrategy} from '@angular/common';
// import { AdminHomeComponent } from './admin-home/admin-home.component';
// import { ChartsModule } from 'ng2-charts';
// import { MainRootComponent } from './main-root/main-root.component';
// import { ViewProductComponent } from './view-product/view-product.component';
// import { ProfileComponent } from './profile/profile.component';
// import { AddProfileComponent } from './add-profile/add-profile.component';
// import { UpdateProductComponent } from './update-product/update-product.component';
// import { ProductShowComponent } from './product-show/product-show.component';
// import { AccountInfoComponent } from './account-info/account-info.component';
// import { AddressComponent } from './address/address.component';
// import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
// import { UpdateCompanyComponent } from './update-company/update-company.component';
// import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
// import { ErrorPageComponent } from './error-page/error-page.component';
// import { NoPageSetupComponent } from './no-page-setup/no-page-setup.component';
// import { CustomUrlSerailizerComponent } from './custom-url-serailizer/custom-url-serailizer.component';
// import {UrlSerializer} from '@angular/router';
// import { RatingComponent } from './rating/rating.component';
// import { RatingNowComponent } from './rating-now/rating-now.component';
// import { NotificationComponent } from './notification/notification.component';
// import { AddProductVariantComponent } from './add-product-variant/add-product-variant.component';
// import { NinetoysHeaderComponent } from './ninetoys-header/ninetoys-header.component';
// import { NinetoysHomeComponent } from './ninetoys-home/ninetoys-home.component';
// import { NinetoysFooterComponent } from './ninetoys-footer/ninetoys-footer.component';
// import { ZoomComponent } from './product-show/zoom.component';
// import { AngularFireMessagingModule } from '@angular/fire/messaging';
// import { AngularFireDatabaseModule } from '@angular/fire/database';
// import { AngularFireAuthModule } from '@angular/fire/auth';
// import { AngularFireModule } from '@angular/fire';
// import { MessagingService } from './messaging.service';
import { environment } from '../environments/environment'; 
// import { AsyncPipe } from '../../node_modules/@angular/common';
// import { AmazingTimePickerModule } from "amazing-time-picker";
// import { NinetoysAdminComponent } from './ninetoys-admin/ninetoys-admin.component';
// import { NinetoysContactComponent } from './ninetoys-contact/ninetoys-contact.component';
// import { NavbarComponent} from './navbar/navbar.component';
// import { LightboxModule } from "@ngx-gallery/lightbox";
// import { GalleryModule } from "@ngx-gallery/core";
// import { GallerizeModule } from '@ngx-gallery/gallerize';
// import { TestingZoomComponent } from './testing-zoom/testing-zoom.component';
// import { ReturnOrderComponent } from './return-order/return-order.component';
// import { HomeProfileComponent } from './home-profile/home-profile.component';


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
    // AlertComponent,
    // HomeComponent,
    // ContactUsComponent,
    // LoginComponent,
    // RegisterComponent,
    FooterComponent,
    // AdminLoginComponent,
    // AdminHomeComponent,
    // MainRootComponent,
    // ViewProductComponent,
    // ProfileComponent,
    // AddProfileComponent,
    // UpdateProductComponent,
    // ProductShowComponent,
    // AccountInfoComponent,
    // AddressComponent,
    // CustomerProfileComponent,
    // UpdateCompanyComponent,
    // ErrorPageComponent,
    // NoPageSetupComponent,
    // CustomUrlSerailizerComponent,
    // RatingComponent,
    // RatingNowComponent,
    // NotificationComponent,
    // AddProductVariantComponent,
    // ZoomComponent,
    // NinetoysHeaderComponent,
    // NinetoysHomeComponent,
    // NinetoysFooterComponent,
    // NinetoysAdminComponent,
    // NinetoysContactComponent,
    // NavbarComponent,
    // TestingZoomComponent,
    // ReturnOrderComponent,
    // HomeProfileComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    
  //   LightboxModule,
  // GalleryModule,
  // GallerizeModule,
  // AmazingTimePickerModule,
  // NgxMaterialTimepickerModule,
  //  MatSnackBarModule,
   // MatRippleModule,
    BrowserModule,
    //MatTooltipModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // MatCardModule,
    // MatExpansionModule,
    // MatSidenavModule,
    // MatFormFieldModule,
    HttpClientModule,
   // MatNativeDateModule,
    ReactiveFormsModule, 
    FormsModule,
    //MatSnackBarModule,
    BrowserModule,
    BrowserAnimationsModule,
  //   MatCardModule,
  //   NgOtpInputModule,
  //   MatButtonModule,
  //   MatCardModule,
  //   MatIconModule,
  //   MatMenuModule,
  //   MatToolbarModule,
  //   MatStepperModule,
  //   MatFormFieldModule,
  //   MatExpansionModule,
  //   MatInputModule,
  //   MatGridListModule, 
  //  FlexLayoutModule,
  //  MatOptionModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    // MatSelectModule,
    // MatOptionModule,
    // MatCheckboxModule,
    // MatDialogModule,
    // MatTableModule,
    // MatSortModule,
    // MatProgressSpinnerModule,
    // MatProgressBarModule,
    // MatDatepickerModule,
    // MatNativeDateModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    // MatTabsModule,
    // MatListModule,
    // MatRadioModule,
    // MatChipsModule,
    // MatPaginatorModule,
    // ChartsModule,
    NgbModule,
    // PDFExportModule,
    // AngularFireDatabaseModule,
    // AngularFireAuthModule,
    // AngularFireMessagingModule,
    // AngularFireModule.initializeApp(environment.firebase),
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

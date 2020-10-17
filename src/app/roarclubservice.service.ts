import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
// import { timer ,Subject, Observable } from 'rxjs';
import { timer, Subject, Observable, BehaviorSubject } from "rxjs";
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RoarclubserviceService {

  constructor(private https: HttpClient) { }

  private options = {
    headers: new HttpHeaders().set(
      "Authorization",
      sessionStorage.getItem("jwtoken")
    )
  };
  buy: boolean = false;
  baseUrl = environment.baseUrl;
  uploadUrlApi = environment.UploadUrl; 

  public cartCount = new Subject<any>();
  public loginUpdateSubject = new Subject<any>();
  loginUpdateObservable$ = this.loginUpdateSubject.asObservable();
  cartCount$ = this.cartCount.asObservable();

  private productSource = new BehaviorSubject({});
  currentList = this.productSource.asObservable();

    //***************************CLIENT SITE APIS **********************************************
    loginuser(data) {
      return this.https.post(
         // 'https://www.ecomtrails.com/ecom_api/index.php/registration/login' ,
  
        "http://ecom.9toys.in/ecom_api/index.php/registration/login",
        data
      );
    }
    
    //  loginuser(data){
    //     return this.https.post("http://localhost/ecomTrailsC/index.php/registration/login", data);
    // }
    fetch_product_list_check(data){
      return this.https.post(this.baseUrl + "user/fetch_product_list_check", data);
    }
    register(data) {
      return this.https.post(this.baseUrl + "registration/register", data);
    }
    forgotPassword(data){
          return this.https.post(this.baseUrl + "registration/forgotPassword", data);
  
    }
    // add_product_variation_images(data){
    //    return this.https.post(this.baseUrl + "admin/add_product_variation_images", data);
  
    // }
     add_product_variation_images(data){
       return this.https.post(this.baseUrl + "admin/add_product_variation_images2", data);
  // 
    }
    add_product_variation(data){
       return this.https.post(this.baseUrl + "admin/add_product_variation2", data);
  
    }
    // add_product_variation(data){
    //    return this.https.post(this.baseUrl + "admin/add_product_variation", data);
  
    // }
    updateclientname(data){
    return this.https.post(this.baseUrl + "profile/update_profile", data);
    }
  
    hostlink(data) {
      return this.https.post(this.baseUrl + "user/get_host_details", data);
    }
    search(data) {
      return this.https.post(this.baseUrl + "user/searching", data);
    }
    searching_ecom(data){
          return this.https.post(this.baseUrl + "user/searching_ecom", data);
  
    }
  
    newProducts(data) {
      return this.https.post(this.baseUrl + "user/newProducts", data);
    }
    topSellingProducts(data) {
      return this.https.post(this.baseUrl + "user/topSellingProducts", data);
    }
    topDiscountProducts(data) {
      return this.https.post(this.baseUrl + "user/topDiscountProducts", data);
    }
    viewProduct(data) {
      return this.https.post(this.baseUrl + "user/fetch_product", data);
    }
    fetch_categories(data) {
      return this.https.post(this.baseUrl + "user/fetch_categories", data);
    }
  
    fetch_categories_ecom(data) {
      return this.https.post(this.baseUrl + "user/fetch_categories_ecom", data);
    }
    allCategoryProductCount(data) {
      return this.https.post(this.baseUrl + "user/allCategoryProductCount", data);
    }
    fetch_product_list(data) {
      return this.https.post(this.baseUrl + "user/fetch_product_list", data);
    }
    similar_product(data) {
      return this.https.post(this.baseUrl + "user/similar_product", data);
    }

      // ***********************//////////cart api ////////////********************************** */
  updateCartCount() {
    this.cartCount.next();
  }

  loginUpdate() {
    this.loginUpdateSubject.next();
  }
  fetch_user_product_reviews(data){
        return this.https.post(this.baseUrl + "user_log/fetch_user_product_reviews", data);

  }
  insertReview(data) {
    return this.https.post(this.baseUrl + "user_log/insert_reviews", data);
  }
  fetchReview(data) {
    return this.https.post(this.baseUrl + "user/fetch_reviews", data);
  }
  
  check_order_product(data) {
    return this.https.post(this.baseUrl + "user_log/check_order_product", data);
  }

  fetchCart(data) {
    return this.https.post(this.baseUrl + "user_log/fetch_cart", data);
  }
  updateCart(data) {
    return this.https.post(this.baseUrl + "user_log/update_cart", data);
  }
  addCart(data) {
    return this.https.post(this.baseUrl + "user_log/insert_cart", data);
  }
  deleteCart(data) {
    return this.https.post(this.baseUrl + "user_log/delete_cart", data);
  }

  getParticularCart(data) {
    return this.https.post(this.baseUrl + "user_log/fetch_cart", data);
  }
  fetch_cart_count(data){
        return this.https.post(this.baseUrl + "user_log/fetch_cart_count", data);

  }
  fetch_cart_specific(data) {
    return this.https.post(this.baseUrl + "user_log/fetch_cart_specific", data);
  }
  fetchWishlist(data) {
    return this.https.post(this.baseUrl + "user_log/fetch_wishlist", data);
  }
  // updateWishlist(data){
  //   return this.https.post(this.baseUrl + "user_log/delete_wishlist", data);

  // }
  addWishlist(data) {
    return this.https.post(this.baseUrl + "user_log/insert_wishlist", data);
  }
  deleteWishlist(data) {
    return this.https.post(this.baseUrl + "user_log/delete_wishlist", data);
  }

  paymentList(data) {
    return this.https.post(
      this.baseUrl + "user_log/fetch_payment_method",
      data
    );
  }
  fetch_payment_method_specific(data){
    return this.https.post(
      this.baseUrl + "admin/fetch_payment_method_specific",
      data
    );
  }
  fetch_courier_method_specific(data){
    return this.https.post(
      this.baseUrl + "admin/fetch_courier_method_specific",
      data
    );
  }
   paymentListAdmin(data) {
    return this.https.post(
      this.baseUrl + "admin/fetch_payment_method",
      data
    );
  }
   courierListAdmin(data) {
    return this.https.post(
      this.baseUrl + "admin/fetch_courier_method",
      data
    );
  }
checkUserExist(data) {
    return this.https.post(
      this.baseUrl + "company/checkUserExist",
      data
    );
  }
    //*************END CATEGORY ADMIN

  //function to get images////////////////////////////////
  getImage(image): string {
    return this.uploadUrlApi + "product/gallery/images/" + image;
  }
  getFile(image): string {
    return this.uploadUrlApi + image;
  }

  getThumbnail1(thumbnail1): string {
    return this.uploadUrlApi + "product/gallery/thumbnail1/" + thumbnail1;
  }
  getIcon(icon, id): string {
    return this.uploadUrlApi + "company_" + id + "/icon_image_link/" + icon;
  }
  getSignature(icon, id): string {
    return (
      this.uploadUrlApi + "company_" + id + "/signature_image_link/" + icon
    );
  }

  getThumbnail2(thumbnail2): string {
    return this.uploadUrlApi + "product/thumbnail2/" + thumbnail2;
  }
  getGalleryImage(image): string {
    return this.uploadUrlApi + "product/gallery/images/" + image;
  }
  getGalleryThumbnail1(thumbnail1): string {
    return this.uploadUrlApi + "product/gallery/thumbnail1/" + thumbnail1;
  }
  getGalleryThumbnail2(thumbnail2): string {
    return this.uploadUrlApi + "product/gallery/thumbnail2/" + thumbnail2;
  }

  getbrandImage(image): string {
    return this.uploadUrlApi + "brand/image_location/" + image;
  }
  // viewCompanyDetails(data){
  //   return this.https.post(this.baseUrl + "company_details/viewCompanyDetails", data);
  // }

  //end*****************************************

  // Aman Verma *********************
  userprofile(data) {
    return this.https.post(
      this.baseUrl + "company_details/viewCompanyDetails",
      data
    );
  }
  viewCompanyDetail(data) {
    return this.https.post(
      this.baseUrl + "company_details/viewCompanyDetail",
      data
    );
  }

  checkCompanyStatus(data) {
    return this.https.post(this.baseUrl + "company/checkCompany", data);
  }
  //Start checkout
  insertAddress(data) {
    return this.https.post(this.baseUrl + "profile/insert_address", data);
  }
  updateAddress(data) {
    return this.https.post(this.baseUrl + "profile/update_address", data);
  }
  fetchAddress(data) {
    return this.https.post(this.baseUrl + "profile/fetchAddresses", data);
  }
  getAddressSpecific(data) {
    return this.https.post(this.baseUrl + "profile/getAddressSpecific", data);
  }

  reset_password(data) {
    return this.https.post(this.baseUrl + "profile/resetPassword", data);
  }
  get_profile(data) {
    return this.https.post(this.baseUrl + "profile/get_profile", data);
  }
  removeAddress(data) {
    return this.https.post(this.baseUrl + "profile/deleteAddress", data);
  }
  removeFromWishlist(data) {
    return this.https.post(this.baseUrl + "user_log/delete_wishlist", data);
  }
  payment(data) {
    return this.https.post(this.baseUrl + "user_log/payment", data);
  }
  transaction_of_orders_razorpay(data) {
    return this.https.post(
      this.baseUrl + "user/transaction_of_order_razor_pay",
      data
    );
  }
  transaction_of_order_payumony_web(data){
     return this.https.post(
      this.baseUrl + "user/transaction_of_order_payumony_web",
      data
    );
  }
  paymentMethod(data) {
    return this.https.post(
      this.baseUrl + "user_log/fetch_payment_method",
      data
    );
  }
  payment_status_check(data) {
    return this.https.post(this.baseUrl + "user/payment_status_check", data);
  }

  fetch_banner_image(data) {
    return this.https.post(this.baseUrl + "user/fetch_banner_images", data);
  }
  addToCartWL(data) {
    return this.https.post(this.baseUrl + "user_log/insert_cart_all", data);
  }

  fethcProductWishlist(data) {
    return this.https.post(this.baseUrl + "user/fetch_product_wishlist", data);
  }
  fetch_particular_company_registry_with_sno(data){
    return this.https.post(
      this.baseUrl + "company/fetch_particular_company_registry_with_sno",
      data
    );
  }
  // fetch_banner_image(data) {
  //   return this.https.post(this.baseUrl + "user/fetch_banner_images", data);
  // }

  // fethcProductWishlist(data) {
  //   return this.https.post(this.baseUrl + "user/fetch_product_wishlist", data);
  // }
  fetch_media_links(data){
    return this.https.post(this.baseUrl + "user/fetch_media_link", data);    
  }
  getCompnyBasicDetail(data) {
    return this.https.post(
      this.baseUrl + "user/get_company_basic_details",
      data
    );
  }
}

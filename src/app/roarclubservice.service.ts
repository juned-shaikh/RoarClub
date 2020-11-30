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
  otpSendForLogin(data){
    return this.https.post(this.baseUrl + "registration/otpSendForLogin", data);

  }
  getparticularCompSetting(data) {
    return this.https.post(
      this.baseUrl + "user/fetch_particular_company_registry",
      data
    );
  }
  otpVerification(data) {
    return this.https.post(this.baseUrl + "company/otpVerification", data);
  }

  resendOtpForLogin(data){
    return this.https.post(this.baseUrl + "registration/resendOtpForLogin", data);

  }
  otpVerificationForLogin(data){
        return this.https.post(this.baseUrl + "registration/otpVerificationForLogin", data);

  }
  otpGenerate(data) {
    return this.https.post(this.baseUrl + "user/otpGenerate", data);
  }
  otpVerificationUser(data) {
    return this.https.post(this.baseUrl + "user/otpVerification", data);
  }
  resendOtpVerify(data) {
    return this.https.post(this.baseUrl + "user/resendOtpVerify", data);
  }
  registerVendor(data) {
    return this.https.post(this.baseUrl + "company/registerVendor", data);
  }
  getState(data) {
    return this.https.post(this.baseUrl + "profile/get_state", data);
  }
  getCity(data) {
    return this.https.post(this.baseUrl + "profile/get_city", data);
  }
  getCountry(data) {
    return this.https.post(this.baseUrl + "profile/get_country", data);
  }
  ResendOtpVerification(data) {
    return this.https.post(this.baseUrl + "company/resendOtp", data);
  }
  fetch_coupon_code(data) {
    return this.https.post(this.baseUrl + "admin/fetch_coupon_code", data);
  }
  unsubscribe_topic(data){
    return this.https.post(this.baseUrl + "notification/topic_unsubscribe_notification", data);

  } 
  pincode_api(data){
    return this.https.post(this.baseUrl + "company/pincode_api", data);

}
pincode_country_state_city_api(data){
    return this.https.post(this.baseUrl + "company/pincode_country_state_city_api", data);

}
  estimate_time_delivery(data){
    return this.https.post(this.baseUrl + "user/estimate_time_delivery", data);

  }
  
  ninetoysBanner(data){
    return this.https.post(this.baseUrl + "user/fetch_all_content_slider",data);

  }
  insert_product_visit_log(data){
    return this.https.post(this.baseUrl + "user/insert_product_visit_log", data);

}
fetch_order_with_orderrandomid(data){
  return this.https.post(this.baseUrl + "user/fetch_order_with_orderrandomid", data);

}
fetch_order_detail_without_token(data){
  return this.https.post(this.baseUrl + "user/fetch_order_detail_without_token", data);

}
getOrdersHistory(data) {
  return this.https.post(this.baseUrl + "user_log/fetch_orders", data);
}
  get_host_link(data){
    return this.https.post(this.baseUrl + "user/get_host_link", data);

}
get_host_link_of_comapny(data){
  return this.https.post(this.baseUrl + "user/get_host_link_of_comapny", data);

}
fetch_company_tagline(data){
  return this.https.post(this.baseUrl + "user/fetch_company_tagline", data);    
}
fetchBrands(data) {
  return this.https.post(
    this.baseUrl + "user/fetch_brand_all_for_comp",
    data
  );
}
fetch_subcategory_all_new(data) {
  return this.https.post(this.baseUrl + "user/fetch_subcategory_all", data);
  // return this.https.post("http://localhost/9toys/index.php/user/fetch_subcategory_all", data);

}
fetchBrandsEcom(data) {
  return this.https.post(
    this.baseUrl + "user/fetch_brand_all_for_comp_ecom",
    data
  );
}
changeProductList(list) {
  this.productSource.next(list);
}
cancel_order_by_user(data){
  return this.https.post(this.baseUrl + "order_vendor/cancel_order_by_user", data);

}
// start return
complete_with_refund(data){
  return this.https.post(this.baseUrl + "order_vendor/complete_with_refund", data);

}
update_return_initiate(data){
  return this.https.post(this.baseUrl + "order_vendor/update_return_initiate", data);

}
returnInitiate(data) {
  return this.https.post(this.baseUrl + "admin/return_initiate", data);
}

returnIntransit(data) {
  return this.https.post(this.baseUrl + "admin/return_intransit", data);
}

returnAccept(data) {
  return this.https.post(this.baseUrl + "admin/return_accepted", data);
}

returnReject(data) {
  return this.https.post(this.baseUrl + "admin/return_reject", data);
}

returnReceived(data) {
  return this.https.post(this.baseUrl + "admin/return_completed", data);
}
returnComplete(data) {
  return this.https.post(this.baseUrl + "admin/return_completed_full", data);
}
returnDispute(data) {
  return this.https.post(this.baseUrl + "admin/return_disputed", data);
}
// getproduct(data){
//   return this.https.post(this.NodeBaseUrl+"barcode/get_product_with_stock",data);
//     }
// end return
updateOrderStatusMulti(data){
      return this.https.post(this.baseUrl + "order_vendor/updateOrderStatusMulti", data);

}
add_dimension_parcel(data){
  return this.https.post(this.baseUrl + "order_vendor/add_dimension_parcel", data);

}
}

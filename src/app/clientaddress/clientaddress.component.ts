import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  NgForm
} from "@angular/forms";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { first } from "rxjs/operators";
import { RoarclubserviceService } from "../roarclubservice.service";
import {MatSnackBar} from  '@angular/material/snack-bar'
import { MatTableDataSource } from "@angular/material/table";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import {  MatStepper } from "@angular/material/stepper";
import { WindowRefService } from "../window-ref.service";
import { CookieService } from "ngx-cookie-service";
import { environment } from "../../environments/environment";

@Component({
  selector: "app-clientaddress",
  templateUrl: "./clientaddress.component.html",
  styleUrls: ["./clientaddress.component.css"],
  providers: [WindowRefService]
})
export class ClientaddressComponent implements OnInit {
  disabled = true;
  cod_otp_enable=true;
  billingDone = false;
  total_entity=0;
  register;
  ship_ask=true;
  net_amt2;
    ship_charge;

  cart_id2;
  coupon_log_id:any;
    loading=true;
address_exist=true;
save_promo2;
  promo_cod2;
  promo_cod=false;
  disablePaymentButton=true;
  rz_key="rzp_live_pEf6WmxW8zCcr9";
  host_name;
  shipAddShow=false;
  public payuform :any={};
  public stepBillingAddress = false;
  public stepShippingAddress = false;
  public stepReviewOrder = false;
  public stepSelectedProducts = true;
  public placeOrder = false;
  public placeOrder2 = false;
  placeOrder2codY=false;
  placeOrder2codN=false;
  public placeOrderPayumoney=false;
  public placeOrderPaytm = false;
  public stockCheck = false;
  billingArr; 
  makePaymenShip=false;
  makePaymenBill=false;
  merchant_key;
  totalPriceStock;
  paymentOptions2;
  otpAddress;
  encRequest;
  productinfo;
  state_fetch;
  city_fetch;
  country_fetch;
  country_fetch2;
  state_fetch2;
  city_fetch2;
  otpgeneration = false;
  verify = false;
  razorpay_order_id;
  public order_status: any;
  razorpayId;
  web_shipping_shipping_charge2: any;
  placeOrderCCavenue;
  shipping_amt;
  public paymentOptions: any;
  public addresses: any;
  public billingAddress: any;
  public shippingAddress: any;
  public cartCount = 0;
  public products: any;
  public totalPrice: any;
  public loader = true;
  public forpaymentshow =false;
  public forpaymenthide =true;
  buy_now=false;
  product_no: any;
  cart;
  c;
  save_promo;
  inventory_total_amt;
  discount_promo;
  otpForm: FormGroup;
  registerForm: FormGroup;
  registerForm2: FormGroup;
  user_num = sessionStorage.getItem("user_num");
  access_token = sessionStorage.getItem("access_token");
  countries;
  states;
  cities;
  country;
  net_amount;
  updateAddres;
  coupon_count=1;
  temp_amt;
  visibledisabled;
  previewFlag = sessionStorage.getItem("previewFlag");

  public sendDataToAPI = {
    user_num: sessionStorage.getItem("user_num"),
    access_token: sessionStorage.getItem("access_token"),
    billing_address_no: "",
    comp_num: sessionStorage.getItem("comp_num_new"),
    shipping_address_no: "",
    web:"web",
     coupon_log_id:"",

    payment_method_id: 1
  };
  address;
  fees;
  flagEmail=0;
  flagMobile=0;
  public sendDataToAPIRazorpay = {
    user_num: sessionStorage.getItem("user_num"),
    access_token: sessionStorage.getItem("access_token"),
    billing_address_no: "",
    comp_num: sessionStorage.getItem("comp_num_new"),
    shipping_address_no: "",
    web:"web",
    payment_method_id: "",
    coupon_log_id:"",

    key: "",
    amount: "",

    currency: "INR",
    receipt: "rcptid_111",
    payment_capture: "1",
    name: "",
    email: "",
    mobile: ""
  };
  otp: string;
  public razorpayPaymentForm = {
    key: "",
    amount: "",
    name: "",
    order_id: "",
    currency: "",
    receipt: "",
    payment_capture: ""
  };
  
  public fillPaymentForm = {
    firstname: "",
    email: "",
    key: "",
    hash: "",
    txnid: "",
    amount: "",
    phone: "",
   curl:"https://www.ecomtrails.com/ecom_api/index.php/user/transaction_of_order_payumony_web",
    productinfo: "163",
    surl: "https://www.ecomtrails.com/ecom_api/index.php/user/transaction_of_order_payumony_web",
    furl: "https://www.ecomtrails.com/ecom_api/index.php/user/transaction_of_order_payumony_web",
    service_provider: "payu_paisa",
    udf1: "",
    udf2: "",
    udf3: "",
    udf4: "",
    udf5: ""
   //  firstname: "name",
   //  email: "abc@xy.z",
   //  key: "gtKFFx",
   //  hash: "5109c5c961d654177bcaf50631e7960e5e585cc4deac70d36d0fe2735d0d620d71b47640068ecdfc65d0b446d1d0d0917ac72da0d02cd4b87a9c608eeb93bf45",
   //  txnid: "a3c9d03d4acb0c8c9b4f",
   //  amount: "15",
   //  phone: "9644180393",
   // curl:"https://ecomtrails.com/ecom_api/index.php/transaction/transaction_of_orders",
   //  productinfo: "163",
   //  surl: "https://ecomtrails.com/ecom_api/index.php/transaction/transaction_of_orders",
   //  furl: "https://ecomtrails.com/ecom_api/index.php/transaction/transaction_of_orders",
   //  service_provider: "payu_paisa",
   //  udf1: "163",
   //  udf2: "30",
   //  udf3: "30",
   //  udf4: "30",
   //  udf5: "30"
  };
  public fillPaytmForm = {

    MID: "",
    WEBSITE: "",
    ORDER_ID: "",
    CUST_ID: "",
    MOBILE_NO: "",
    EMAIL: "",
    INDUSTRY_TYPE_ID: "",
    CHANNEL_ID: "",
    TXN_AMOUNT: "",
    CALLBACK_URL: "",
    CHECKSUMHASH: "",
   
  };



@ViewChild('form', { static: true }) cartForm: NgForm;

  // @ViewChild("form", { static: true }) formpaytm: NgForm;
 
  // @ViewChild("form", { static: true }) form: ElementRef;
  @ViewChild("stepper", { static: true }) stepper: MatStepper;
  constructor(
    private snackbar: MatSnackBar,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private adminservice: RoarclubserviceService,
    private modalService: NgbModal,
    private winRef: WindowRefService,
    private cookie: CookieService,
    private http: HttpClient
  ) {}

  openXl(content) {
    this.modalService.open(content, { size: "lg" });
  }
  openXl1(content) {
    this.modalService.open(content, { size: "md" });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
  // onOtpChange(otp) {
  //   this.otp = otp;
  // }

  ngOnInit() {
     this.cookie.set('buy_now_product',"false");

    if(this.adminservice.buy == true){
      this.buy_now=true;
    }

    this.adminservice.buy=false;
            this.compSettings2();

     this.cookie.delete("product_id2");
    this.cookie.delete("rate_type");
     this.cookie.delete("quantity");
    this.getCart();
    let l = location.origin;
    var c = l.split("//");
    this.host_name = c[1];

    this.compSettings();

    this.registerForm = this.formBuilder.group({
      user_num: this.user_num,
      // comp_num:this.comp_num,
      access_token: this.access_token,
      line1: [""],
      line2: [""],
      landmark: [""],
      pin_code: [""],
      city_id: [""],
      country_id: [""],
      state: [{ value: "", disabled: true }],
      city: [{ value: "", disabled: true }],
      state_id: [""],
      contact_no: [""],
      email: [""],
      receiver_name: [""]
    });
    this.otpForm = this.formBuilder.group({
      username: [""],
      otp: [""],
      subject:["COD"]
    });
    this.registerForm2 = this.formBuilder.group({
      address_no: [""],
      user_num: this.user_num,
      access_token: this.access_token,
      line1: [""],
      line2: [""],
      landmark: [""],
      pin_code: [""],
      city_id: [""],
      state: [{ value: "", disabled: true }],
      city: [{ value: "", disabled: true }],
      country_id: [""],
      state_id: [""],
      contact_no: [""],
      email: [""],
      receiver_name: [""]
    });
    this.get_profile();
    // this.stepper.selectedIndex = 1;
    this.loader = true;
    // this.stepperselectedIndex();

    this.getAddresses();

    this.getPaymentOptions();

    this.getCountry();
    // this.checkEmailMobile();
    // this.getCity(1,1);
    if(sessionStorage.getItem('mobile') && sessionStorage.getItem('mobile')!=null && sessionStorage.getItem('mobile')!='' && sessionStorage.getItem('mobile')!='null'){
      this.flagMobile=1;
     
    }
    if(sessionStorage.getItem('email') && sessionStorage.getItem('email')!=null && sessionStorage.getItem('email')!='null' && sessionStorage.getItem('email')!=''){
      this.flagEmail=1;
     
    }
  }


  getCountry() {
    let postData = { user_num: this.user_num, access_token: this.access_token };
    this.adminservice.getCountry(postData).subscribe(data => {
      this.countries = data["result"];
    });
  }

  getStates(country_id) {
    this.country = country_id;
    let postData = {
      user_num: this.user_num,
      access_token: this.access_token,
      country_id: country_id
    };

    this.adminservice.getState(postData).subscribe(data => {
      this.states = data["result"];
    });
  }
  getCity(state_id, country_id) {
    var postData = null;

    if (country_id == null) {
      postData = {
        user_num: this.user_num,
        access_token: this.access_token,
        country_id: this.country,
        state_id: state_id
      };
    } else {
      postData = {
        user_num: this.user_num,
        access_token: this.access_token,
        country_id: country_id,
        state_id: state_id
      };
    }

    this.adminservice.getCity(postData).subscribe(data => {
      this.cities = data["result"];
    });
  }

  stepSelectedProductsDefault(stepper: MatStepper) {
    setTimeout(() => stepper.next(), 1);
  }

  stepperselectedIndex() {
    this.loader = true;
    this.stepper.selectedIndex = 1;
  }
  addBillingAddress2(id) {
    this.sendDataToAPI.billing_address_no = this.addresses[id].address_no;
    this.sendDataToAPIRazorpay.billing_address_no = this.addresses[
      id
    ].address_no;
    this.makePaymenBill=true;
    this.billingDone = true;
    // this.billingArr = id;//21/08/2020 for no shipping address ask
  //start 21/08/2020 Priyangee for no shipping address ask this.sendDataToAPI.shipping_address_no = this.addresses[id].address_no;
    // this.otpForm.billing_address_no = this.addresses[id].address_no;
    this.sendDataToAPIRazorpay.shipping_address_no = this.addresses[
      id
    ].address_no;
    this.sendDataToAPIRazorpay.email = this.addresses[id].email;
    this.sendDataToAPIRazorpay.mobile = this.addresses[id].contact_no;
    this.sendDataToAPIRazorpay.name = this.addresses[id].receiver_name;

    this.stepBillingAddress = true;
    this.stepShippingAddress = true;
    this.makePaymenShip=true;
  }

  // addBillingAddress(id, stepper: MatStepper) {
  //   this.sendDataToAPI.billing_address_no = this.addresses[id].address_no;
  //   // this.otpForm.billing_address_no = this.addresses[id].address_no;
  //   this.sendDataToAPIRazorpay.billing_address_no = this.addresses[
  //     id
  //   ].address_no;

  //   this.stepBillingAddress = true;
  //   setTimeout(() => stepper.next(), 300);
  // }
  addBillingAddress(id) {
    // this.sendDataToAPI.billing_address_no = this.addresses[id].address_no;
    // // this.otpForm.billing_address_no = this.addresses[id].address_no;
    // this.sendDataToAPIRazorpay.billing_address_no = this.addresses[
    //   id
    // ].address_no;
   this.shipAddShow=true;
    this.getAddressSpecific2(this.sendDataToAPI.billing_address_no);
 
    this.stepBillingAddress = true;
    // setTimeout(() => stepper.next(), 300);
  }
  addBillingAddress3(id, stepper: MatStepper) {
     this.sendDataToAPI.billing_address_no = this.addresses[id].address_no;
    this.sendDataToAPIRazorpay.billing_address_no = this.addresses[
      id
    ].address_no;
    this.makePaymenBill=true;
    this.billingDone = true;
 //end 21/08/2020
    this.sendDataToAPI.shipping_address_no = this.addresses[id].address_no;
    // this.otpForm.billing_address_no = this.addresses[id].address_no;
    this.sendDataToAPIRazorpay.shipping_address_no = this.addresses[
      id
    ].address_no;
    this.sendDataToAPIRazorpay.email = this.addresses[id].email;
    this.sendDataToAPIRazorpay.mobile = this.addresses[id].contact_no;
    this.sendDataToAPIRazorpay.name = this.addresses[id].receiver_name;

    this.stepBillingAddress = true;
    this.stepShippingAddress = true;
    this.makePaymenShip=true;
    // this.stepper.selectedIndex = 4;
    // setTimeout(() => stepper.next(), 300);
    // setTimeout(() => stepper.next(), 300);
  }

  addShippingAddress(id, stepper: MatStepper) {
    this.sendDataToAPI.shipping_address_no = this.addresses[id].address_no;

    this.sendDataToAPIRazorpay.shipping_address_no = this.addresses[
      id
    ].address_no;
this.makePaymenShip=true;
    this.stepShippingAddress = true;
    // setTimeout(() => stepper.next(), 300);
  }

  reviewOrder(stepper: MatStepper) {
    this.stepReviewOrder = true;
    // setTimeout(() => stepper.next(), 300);
  }
  payment() {
    this.loader = false;
    this.placeOrder2 = false;
    this.visibledisabled = false;
  this.sendDataToAPI["coupon_log_id"] =this.coupon_log_id;
     
    if (this.buy_now == true) {
      this.sendDataToAPI["product_no"] = sessionStorage.getItem("product_no2");
      this.sendDataToAPI["rate_type"] = sessionStorage.getItem("rate_buy");
    }
    this.adminservice.payment(this.sendDataToAPI).subscribe(data => {
      if (data["status"] == "1") {
        // sessionStorage.getItem("productinfo");
        this.loader = true;
        sessionStorage.setItem("productinfo", data["productinfo"]);
        if (this.previewFlag == "1") {
           if ((sessionStorage.getItem("comp_num_new") == "0") && (this.host_name != "localhost:4209")) {
          // if ((sessionStorage.getItem("comp_num_new") == "0") && (this.host_name != "www.ecomtrails.com")) {
              this.router.navigate(["/Admin/preview/checkout-status"]);
            } else {
              this.router.navigate(["/checkout-status"]);
            }
        } else {
          this.router.navigate(["/checkout-status"]);
        }
      } else if (data["status"] == "10") {
        this.loader = true;
        if (this.previewFlag == "1") {
          if ((sessionStorage.getItem("comp_num_new") == "0") && (this.host_name != "localhost:4209")) {
          // if ((sessionStorage.getItem("comp_num_new") == "0") && (this.host_name != "www.ecomtrails.com")) {
              this.router
                .navigateByUrl("/RefreshComponent", {
                  skipLocationChange: true
                })
                .then(() => this.router.navigate(["/Admin/preview/home"]));
          } else {
            this.router
              .navigateByUrl("/RefreshComponent", {
                skipLocationChange: true
              })
              .then(() => this.router.navigate(["/home"]));
          }
        } else {
          this.router
            .navigateByUrl("/RefreshComponent", {
              skipLocationChange: true
            })
            .then(() => this.router.navigate(["/home"]));
        }
      } else {
        this.loader = true;
        if (sessionStorage.getItem("access_token") == "") {
          if (this.previewFlag == "1") {
             if ((sessionStorage.getItem("comp_num_new") == "0") && (this.host_name != "localhost:4209")) {
          // if ((sessionStorage.getItem("comp_num_new") == "0") && (this.host_name != "www.ecomtrails.com")) {
                this.router
                  .navigateByUrl("/RefreshComponent", {
                    skipLocationChange: true
                  })
                  .then(() => this.router.navigate(["/Admin/preview/home"]));
              } else {
                this.router
                  .navigateByUrl("/RefreshComponent", {
                    skipLocationChange: true
                  })
                  .then(() => this.router.navigate(["/home"]));
              }
          } else {
            this.router
              .navigateByUrl("/RefreshComponent", {
                skipLocationChange: true
              })
              .then(() => this.router.navigate(["/home"]));
          }
        }
      }
    }
    ,
        error => {
          this.loader=true;
          this.snackbar.open("Something Went wrong please try again. ", "", {
            duration: 3000
          });
        });
  }

  addAddress() {
    if (this.registerForm.invalid) {
      alert("* fields are required.");
      // return;
    } 
    else if( this.registerForm.controls.state.value=="" ||

          this.registerForm.controls.city.value==""
){
      alert("Please fill correct pincode.");

    }
    else {
      let postData = this.registerForm.value;
      this.adminservice.insertAddress(postData).subscribe(
        data => {
          if (data["status"] == 1) {
            this.flagEmail=1;
            this.flagMobile=1;
             this.modalService.dismissAll('Save click');
              
            this.snackbar.open("Address is added Successfully ", "", {
              duration: 3000,
              horizontalPosition: "center"
            });
            if(this.address_exist==false){
              this.getAddresses();
            }
            if (this.previewFlag == "1") {
               if ((sessionStorage.getItem("comp_num_new") == "0") && (this.host_name != "localhost:4209")) {
          // if ((sessionStorage.getItem("comp_num_new") == "0") && (this.host_name != "www.ecomtrails.com")) {
                  this.router
                    .navigateByUrl("/RefreshComponent", {
                      skipLocationChange: true
                    })
                    .then(() => this.router.navigate(["/Admin/preview/checkout"]));
              } else {
                this.router
                  .navigateByUrl("/RefreshComponent", {
                    skipLocationChange: true
                  })
                  .then(() => this.router.navigate(["/checkout"]));
              }
            } else {
              this.router
                .navigateByUrl("/RefreshComponent", {
                  skipLocationChange: true
                })
                .then(() => this.router.navigate(["/checkout"]));
            }
          } else {
            this.snackbar.open("Unable to add Address,Please try again.", "", {
              duration: 3000
            });
          }
        },
        error => {
          this.snackbar.open("Something Went wrong please try again. ", "", {
            duration: 3000
          });
        }
      );
    }
  }

  updateAddress() {
    if (this.registerForm2.invalid) {
      alert("* fields are required.");
      // return;
    } 
    else if( this.registerForm2.controls.state.value=="" ||

         this.registerForm2.controls.city.value==""
        ){
 alert("Please fill correct pin code.");
     
    }
    else {
      let postData = this.registerForm2.value;
      this.adminservice.updateAddress(postData).subscribe(
        data => {
          if (data["status"] == 1) {
             this.flagEmail=1;
            this.flagMobile=1;
             this.modalService.dismissAll('Save click');
              
            this.snackbar.open("Address is updated Successfully ", "", {
              duration: 3000,
              horizontalPosition: "center"
            });
            if (this.previewFlag == "1") {
               if ((sessionStorage.getItem("comp_num_new") == "0") && (this.host_name != "localhost:4209")) {
          // if ((sessionStorage.getItem("comp_num_new") == "0") && (this.host_name != "www.ecomtrails.com")) {
                  this.router
                    .navigateByUrl("/RefreshComponent", {
                      skipLocationChange: true
                    })
                    .then(() => this.router.navigate(["/Admin/preview//home_profile/client-address"]));
              } else {
                this.router
                  .navigateByUrl("/RefreshComponent", {
                    skipLocationChange: true
                  })
                  .then(() => this.router.navigate(["/home_profile/client-address"]));
              }
            } else {
              this.router
                .navigateByUrl("/RefreshComponent", {
                  skipLocationChange: true
                })
                .then(() => this.router.navigate(["/home_profile/client-address"]));
            }
          } else {
            this.snackbar.open("Unable to update Address", "", {
              duration: 3000
            });
          }
        },
        error => {
          this.snackbar.open("Something Went wrong please try again. ", "", {
            duration: 3000
          });
        }
      );
    }
  }
  getAddressSpecific(address_no) {
    this.adminservice
      .getAddressSpecific({
        access_token: this.access_token,
        user_num: this.user_num,
        address_no: address_no
      })
      .subscribe(
        data => {
          if (data["status"] == 1) {
            this.updateAddres = data["result"][0];
            this.registerForm2
              .get("receiver_name")
              .setValue(this.updateAddres.receiver_name);
            this.registerForm2.get("line1").setValue(this.updateAddres.line1);
            this.registerForm2.get("line2").setValue(this.updateAddres.line2);
            this.registerForm2
              .get("landmark")
              .setValue(this.updateAddres.landmark);
            this.registerForm2
              .get("pin_code")
              .setValue(this.updateAddres.pin_code);
            this.registerForm2
              .get("country_id")
              .setValue(this.updateAddres.country_id);
            this.registerForm2
              .get("state_id")
              .setValue(this.updateAddres.state_id);
            this.registerForm2
              .get("city_id")
              .setValue(this.updateAddres.city_id);
            this.state_fetch2 = this.updateAddres.state;
            this.city_fetch2 = this.updateAddres.city;
              this.registerForm2.get("state").setValue(this.state_fetch2);

          this.registerForm2.get("city").setValue(this.city_fetch2);

            this.registerForm2.get("email").setValue(this.updateAddres.email);
            this.getStates(this.updateAddres.country_id);
            this.country = this.updateAddres.country_id;
            this.getCity(
              this.updateAddres.state_id,
              this.updateAddres.country_id
            );
            this.registerForm2
              .get("contact_no")
              .setValue(this.updateAddres.contact_no);
            this.registerForm2.get("address_no").setValue(address_no);
          } else if (data["status"] == 10) {
            sessionStorage.clear();
            this.snackbar.open(
              "Multiple login with this ID has been detected, Logging you out. ",
              "",
              {
                duration: 3000,
                horizontalPosition: "center"
              }
            );
            if (this.previewFlag == "1") {
 if ((sessionStorage.getItem("comp_num_new") == "0") && (this.host_name != "localhost:4209")) {
          // if ((sessionStorage.getItem("comp_num_new") == "0") && (this.host_name != "www.ecomtrails.com")) {
              this.router.navigate(["/Admin/preview/login"]);
               } else {
              this.router.navigate(["/login"]);
            }
            } else {
              this.router.navigate(["/login"]);
            }
          } else {
          }
        },
        error => {}
      );
  }


   getAddressSpecific2(address_no) {
    this.adminservice
      .getAddressSpecific({
        access_token: this.access_token,
        user_num: this.user_num,
        address_no: address_no
      })
      .subscribe(
        data => {
          if (data["status"] == 1) {
            this.address = data["result"];
          } else if (data["status"] == 10) {
            sessionStorage.clear();
            this.snackbar.open(
              "Multiple login with this ID has been detected, Logging you out. ",
              "",
              {
                duration: 3000,
                horizontalPosition: "center"
              }
            );
            if (this.previewFlag == "1") {
 if ((sessionStorage.getItem("comp_num_new") == "0") && (this.host_name != "localhost:4209")) {
          // if ((sessionStorage.getItem("comp_num_new") == "0") && (this.host_name != "www.ecomtrails.com")) {
              this.router.navigate(["/Admin/preview/login"]);
               } else {
              this.router.navigate(["/login"]);
            }
            } else {
              this.router.navigate(["/login"]);
            }
          } else {
          }
        },
        error => {}
      );
  }

  removeAddress(address_no) {
    var res = confirm("Are you sure you want to delete this address.");
    if (res) {
      let postData = {
        user_num: sessionStorage.getItem("user_num"),
        access_token: sessionStorage.getItem("access_token"),
        address_no: address_no
      };
      this.adminservice.removeAddress(postData).subscribe(data => {
        if (data["status"] == "1") {
          this.ngOnInit();
        } else if (data["status"] == "10") {
          if (this.previewFlag == "1") {
            if ((sessionStorage.getItem("comp_num_new") == "0") && (this.host_name != "localhost:4209")) {
          // if ((sessionStorage.getItem("comp_num_new") == "0") && (this.host_name != "www.ecomtrails.com")) {
              this.router
              .navigateByUrl("/RefreshComponent", {
                skipLocationChange: true
              })
              .then(() => this.router.navigate(["/Admin/preview/home"]));
            } else {
              this.router
                .navigateByUrl("/RefreshComponent", {
                  skipLocationChange: true
                })
                .then(() => this.router.navigate(["/home"]));
            }
          } else {
            this.router
              .navigateByUrl("/RefreshComponent", {
                skipLocationChange: true
              })
              .then(() => this.router.navigate(["/home"]));
          }
        } else {
          if (sessionStorage.getItem("access_token") == "") {
            if (this.previewFlag == "1") {
              if ((sessionStorage.getItem("comp_num_new") == "0") && (this.host_name != "localhost:4209")) {
          // if ((sessionStorage.getItem("comp_num_new") == "0") && (this.host_name != "www.ecomtrails.com")) {
                this.router
                  .navigateByUrl("/RefreshComponent", {
                    skipLocationChange: true
                  })
                  .then(() => this.router.navigate(["/Admin/preview/home"]));
              } else {
                this.router
                  .navigateByUrl("/RefreshComponent", {
                    skipLocationChange: true
                  })
                  .then(() => this.router.navigate(["/home"]));
              }
            } else {
              this.router
                .navigateByUrl("/RefreshComponent", {
                  skipLocationChange: true
                })
                .then(() => this.router.navigate(["/home"]));
            }
          }
        }
      });
    }
  }

  getAddresses() {
    let postData = {
      user_num: sessionStorage.getItem("user_num"),
      access_token: sessionStorage.getItem("access_token")
    };
    this.adminservice.fetchAddress(postData).subscribe(data => {
      this.addresses = data["result"];
      if(this.addresses.length>0){
        this.address_exist=true;
          this.flagEmail=1;
            this.flagMobile=1;

             this.sendDataToAPI.shipping_address_no = this.addresses[0].address_no;
    // this.otpForm.billing_address_no = this.addresses[id].address_no;
    this.sendDataToAPIRazorpay.shipping_address_no = this.addresses[
      0
    ].address_no;
    this.sendDataToAPIRazorpay.email = this.addresses[0].email;
    this.sendDataToAPIRazorpay.mobile = this.addresses[0].contact_no;
    this.sendDataToAPIRazorpay.name = this.addresses[0].receiver_name;


 this.sendDataToAPI.billing_address_no = this.addresses[0].address_no;
    this.sendDataToAPIRazorpay.billing_address_no = this.addresses[
      0
    ].address_no;
    this.stepBillingAddress = true;
    this.stepShippingAddress = true;
    this.makePaymenShip=true;
     this.makePaymenBill=true;
      }
      else{
        this.address_exist=false;
      }
    
    });
  }

  getPaymentDetails(mode) {
    //console.log(mode);
    this.loader = true;
    this.visibledisabled = true;
    // document.getElementById("cod_btn").style.display = "none";
    this.placeOrder = false;
    this.placeOrderPayumoney = false;
    this.placeOrder2 = false;
    this.placeOrderPaytm=false;

    this.sendDataToAPI.payment_method_id = mode;
    // this.placeOrder2=true;
    this.sendDataToAPIRazorpay.payment_method_id = mode;
    if (mode == 1) {
      this.placeOrder2codN=false;
      this.placeOrder2codY=false;
      this.placeOrder = false;
       this.placeOrderPayumoney = false;
       this.placeOrderPaytm=false;
      this.placeOrder2 = true;
      if(this.cod_otp_enable==true){
        this.placeOrder2codY=true;
      }
      else{
        this.placeOrder2codN=true;
      }
    }
    else if(mode == 3){
      this.placeOrder = false;
       this.placeOrderPayumoney = true;
       this.placeOrderPaytm=false;
      this.placeOrder2 = false;
      this.paymentPayumoney();
    //   let postData = {
    //   user_num: sessionStorage.getItem("user_num"),
    //   access_token: sessionStorage.getItem("access_token"),
    //   comp_num: sessionStorage.getItem("comp_num_new")
    // };
    // this.adminservice.paymentMethod(postData).subscribe(data => {
    //   this.paymentOptions = data["result"];

    //   this.loader = true;
    // });

    }
    else if(mode == 4){
      this.placeOrder = false;
       this.placeOrderPayumoney = false;
       this.placeOrderPaytm=true;
      this.placeOrder2 = false;
      this.paymentPaytm();
    //   let postData = {
    //   user_num: sessionStorage.getItem("user_num"),
    //   access_token: sessionStorage.getItem("access_token"),
    //   comp_num: sessionStorage.getItem("comp_num_new")
    // };
    // this.adminservice.paymentMethod(postData).subscribe(data => {
    //   this.paymentOptions = data["result"];

    //   this.loader = true;
    // });

    }
    else if(mode==2){
       this.placeOrder2 = false;
       this.placeOrderPayumoney = false;
       this.placeOrderPaytm=false;
      this.placeOrder = true;
    }
     else {
      this.placeOrder2 = false;
       this.placeOrderPayumoney = false;
       this.placeOrderPaytm=false;
      this.placeOrder = true;
    }

    this.loader = true;
    // this.ngxLoader.stop();
  }

  // Function to share data to cash on delivery component
  // cashOnDelivery() {

  //   this.sendDataToAPI.payment_method_id = "1";
  //   this.adminservice.getPaymentDetails(this.sendDataToAPI).subscribe(
  //     data => {
  //       if (data["status"] == "1") {
  //         this.placeOrder = true;
  //         this.sendOrderStatus(data["status"]);
  //       }
  //     },
  //     error => {
  //       this.placeOrder = false;
  //     }
  //   );
  // }

  // sendOrderStatus(status) {
  //   let status_object = { status: status };
  //   this.adminservice.sendOrderStatus(status_object);
  // }


  getCart() {
    // this.isLoggedOut = false;
    // this.loader = false;

    //start for buy now
     if (this.buy_now == true) {
      this.sendDataToAPIRazorpay["product_no"] = sessionStorage.getItem(
        "product_no2"
      );
      this.sendDataToAPIRazorpay["rate_type"] = sessionStorage.getItem(
        "rate_buy"
      );
      var postData2 = { product_no: "", comp_num: "" };
        postData2.product_no = sessionStorage.getItem(
        "product_no2"
      );;
         postData2['quantity']=1;
        postData2.comp_num = sessionStorage.getItem("comp_num_new");

        this.adminservice.fethcProductWishlist(postData2).subscribe(data => {
          this.loader = false;
          if (data["status"] == "1") {
            
            this.cart = data["wishlist"];
            this.total_entity=1;
             this.c = this.cart;
             this.c.shipping_amt=data["total_shipping"];
             this.c.qty=1;
             this.c[0].qty=1;

            this.discount_promo=data["total_discount"];

            this.shipping_amt=data["total_shipping"];
            this.net_amount=data["total_net"];
             this.cart['total_mrp_amount']=this.discount_promo+this.net_amount;
             this.c.total_mrp_amount=this.cart['total_mrp_amount'];

             this.net_amt2 =this.net_amount-this.shipping_amt;
               this.cart['inventory_total_amt']=this.net_amt2;
           this.cart['shipping_total_amt']=this.shipping_amt;
           this.cart['net_amt']=this.net_amount;
           //console.log(this.c);
           this.c[0].shipping_amt=this.cart['shipping_total_amt'];
            this.c[0].rate_name=this.c[0].product_rate[0].rate_name;
             this.c[0].rate=this.net_amt2;
             this.c[0].discount_percent=this.c[0].product_rate[0].discount_percent;
           //console.log(this.c);
           //console.log(this.cart);
          } else {
            
            this.loader = true;
          }
          this.loader = true;
        });
    }
    //end for buy now
    else{
    var postData = { user_num: "", access_token: "", comp_num: "" };
    postData.user_num = sessionStorage.getItem("user_num");
    postData.access_token = sessionStorage.getItem("access_token");
    postData.comp_num = sessionStorage.getItem("comp_num_new");
    if (postData.user_num != "" || postData.access_token != "") {
      this.adminservice.fetchCart(postData).subscribe(data => {
        //
        if (data["status"] == "1") {
          // this.isLoggedIn = true;
          // this.isLoggedOut = false;
          // this.isLoginFull = true;
          this.cart = data["cart"];
          this.total_entity=data['total_entity'];
          this.net_amount=this.cart.net_amt;
          this.shipping_amt=this.cart.shipping_total_amt;
          this.discount_promo=this.cart.discount_amt;
          this.net_amt2=this.cart.inventory_total_amt;
          this.cart_id2=this.cart.cart_id;
          this.c = this.cart.cart_inventory;
          for(let check =0;check<this.c.length;check++){
            if(this.c[check].product.txn_quantity < '1' || this.c[check].product.txn_quantity < 1){
              this.stockCheck =true;
            }
            var rate_type_actual=this.c[check].rate_type;
            this.cart.cart_inventory[check].rate_type_actual=rate_type_actual;
            
          }

          this.loader = true;
        } else if (data["status"] == "10") {
          if(this.previewFlag == '1'){
            if ((sessionStorage.getItem("comp_num_new") == "0") && (this.host_name != "localhost:4209")) {
          // if ((sessionStorage.getItem("comp_num_new") == "0") && (this.host_name != "www.ecomtrails.com")) {
                  this.router
                  .navigateByUrl("/RefreshComponent", {
                    skipLocationChange: true
                  })
                  .then(() => this.router.navigate(["/Admin/preview/login"]));
            }else{
              this.router
              .navigateByUrl("/RefreshComponent", {
                skipLocationChange: true
              })
              .then(() => this.router.navigate(["/login"]));

            }

          }else{
            this.router
            .navigateByUrl("/RefreshComponent", {
              skipLocationChange: true
            })
            .then(() => this.router.navigate(["/login"]));

          }
          
        } else {
          // this.isLoggedIn = true;
          // this.isLoginEmpty = true;
          // this.loader = true;
          
          if (sessionStorage.getItem("access_token") == "") {
            if(this.previewFlag == '1'){
               if ((sessionStorage.getItem("comp_num_new") == "0") && (this.host_name != "localhost:4209")) {
          // if ((sessionStorage.getItem("comp_num_new") == "0") && (this.host_name != "www.ecomtrails.com")) {
                  this.router
                  .navigateByUrl("/RefreshComponent", {
                    skipLocationChange: true
                  })
                  .then(() => this.router.navigate(["/Admin/preview/login"]));
                }else{
                  this.router
                  .navigateByUrl("/RefreshComponent", {
                    skipLocationChange: true
                  })
                  .then(() => this.router.navigate(["/login"]));
      
                }
  
            }else{
              this.router
              .navigateByUrl("/RefreshComponent", {
                skipLocationChange: true
              })
              .then(() => this.router.navigate(["/login"]));
  
            }
          }
        }
      });
    } else {
      this.snackbar.open("Please Login First.", "", {
        duration: 2000
      });
    }
  }
  }



  getPaymentOptions() {
    let postData = {
      user_num: sessionStorage.getItem("user_num"),
      access_token: sessionStorage.getItem("access_token"),
      comp_num: sessionStorage.getItem("comp_num_new")
    };
    this.adminservice.paymentMethod(postData).subscribe(data => {
      this.paymentOptions = data["result"];

      this.loader = true;
    });
  }

  navigateTo(id) {
    setTimeout(() => {
      if (this.previewFlag == "1") {
        if ((sessionStorage.getItem("comp_num_new") == "0") && (this.host_name != "localhost:4209")) {
          // if ((sessionStorage.getItem("comp_num_new") == "0") && (this.host_name != "www.ecomtrails.com")) {
          this.router.navigate(["/Admin/preview/checkout-status"]);
        } else {
          this.router.navigate(["/checkout-status"]);
        }
      } else {
        this.router.navigate(["/checkout-status"]);
      }
    }, 2000);
  }
  navigateTo2() {
    setTimeout(() => {
      if (this.previewFlag == "1") {
        if ((sessionStorage.getItem("comp_num_new") == "0") && (this.host_name != "localhost:4209")) {
          // if ((sessionStorage.getItem("comp_num_new") == "0") && (this.host_name != "www.ecomtrails.com")) {
          this.router.navigate(["/Admin/preview/checkout-status"]);
        } else {
          this.router.navigate(["/checkout-status"]);
        }
      } else {
        this.router.navigate(["/checkout-status"]);
      }
    }, 2000);
  }

  getImage(image): string {
    return this.adminservice.getImage(image);
  }
  //  loadStripe() {
     
  //   if(!window.document.getElementById('stripe-script')) {
  //     var s = window.document.createElement("script");
  //     s.id = "stripe-script";
  //     s.type = "text/javascript";
  //     s.src = "https://checkout.stripe.com/checkout.js";
  //     s.onload = () => {
  //       this.handler = (<any>window).StripeCheckout.configure({
  //         key: 'pk_test_aeUUjYYcx4XNfKVW60pmHTtI',
  //         locale: 'auto',
  //         token: function (token: any) {
  //           // You can access the token ID with `token.id`.
  //           // Get the token ID to your server-side code for use.
  //           alert('Payment Success!!');
  //         }
  //       });
  //     }
       
  //     window.document.body.appendChild(s);
  //   }
  // }

  public initPay(): void {
    var rzp1 = new this.winRef.nativeWindow.Razorpay({
      // key: "rzp_test_9XUwfPpg7b1vBo", //testing
      // key: "rzp_live_pEf6WmxW8zCcr9", //live
      key:this.rz_key,

      amount: this.sendDataToAPIRazorpay.amount,
      name: this.sendDataToAPIRazorpay.name,
      order_id: this.razorpay_order_id,

      handler: this.paymentResponseHander.bind(this),

      prefill: {
        name: this.sendDataToAPIRazorpay.name,
        email: this.sendDataToAPIRazorpay.email,
        contact: this.sendDataToAPIRazorpay.mobile
      },
      notes: {},
      theme: {
        color: "#d4474d"
        // background: linear-gradient(45deg, #6c0753, #e58247, #9c1c8b, #d4474d);
      },
      callback_url:
        environment.baseUrl + "user_log/transaction_of_orders_razorpay"
    });

    rzp1.open();
  }

  paymentResponseHander(response) {
    let postData = {
      razorpay_payment_id: response.razorpay_payment_id,
      razorpay_signature: response.razorpay_signature,
      razorpay_order_id: response.razorpay_order_id
    };
    this.adminservice.transaction_of_orders_razorpay(postData).subscribe(
      data => {
        if (data["status"] == "1") {
        }
      },
      error => {
        // this.placeOrder = false;
      }
    );
  }

  //start for payumoney
  // paymentPayumoney(form:any,e,n) {
    paymentPayumoney() {
    this.loader = false;
    
    if (this.buy_now == true) {
      this.sendDataToAPIRazorpay["product_no"] = sessionStorage.getItem(
        "product_no2"
      );
      this.sendDataToAPIRazorpay["rate_type"] = sessionStorage.getItem(
        "rate_buy"
      );
    }
    this.adminservice.payment(this.sendDataToAPI).subscribe(data => {
      this.loader = true;
      if(data['status']==1){
        // if(1){
      this.fillPaymentForm = {
            // key: "TR4L7npm",
            // key:"ETUuRBef",
            key:data["mkey"],
            // key:"gtKFFx",
          
           
            txnid: data["txnid"],

             // amount: "15",
            amount: data["amount"],
               productinfo: data["productinfo"],
                firstname: data["name"],
            email: data["mailid"],
          
            phone: data["phoneno"],
          
            udf1: data["udf1"],
            udf2:data["udf2"],
            udf3:  data["udf3"],
            udf4:data["udf4"],
            udf5: data["udf5"],
            surl:data["success"],
            furl:data["failure"],
            curl:data["cancel"],
            // surl: "https://ecomtrails.com/ecom_api/index.php/transaction/transaction_of_orders",
            // furl:"https://ecomtrails.com/ecom_api/index.php/transaction/transaction_of_orders",
              hash: data["hash"],
            service_provider:"payu_paisa",
             // service_provider:"",
            // curl:"https://ecomtrails.com/ecom_api/index.php/transaction/transaction_of_orders"
          };


          // this.payuform.txnid = this.fillPaymentForm.txnid;
          // this.payuform.surl = this.fillPaymentForm.surl;
          // this.payuform.furl = this.fillPaymentForm.furl;
          // this.payuform.key = this.fillPaymentForm.key;
          // this.payuform.hash = this.fillPaymentForm.hash;
          // this.payuform.curl = this.fillPaymentForm.curl;

          // this.payuform.amount = this.fillPaymentForm.amount;
          // this.payuform.firstname = this.fillPaymentForm.firstname;
          // this.payuform.email = this.fillPaymentForm.email;
          //  this.payuform.productinfo = this.fillPaymentForm.productinfo;

          // this.payuform.phone = this.fillPaymentForm.phone;
          // this.payuform.udf1 = this.fillPaymentForm.udf1;
          // this.payuform.udf2 = this.fillPaymentForm.udf2;
          // this.payuform.udf3 = this.fillPaymentForm.udf3;
          // this.payuform.udf4 = this.fillPaymentForm.udf4;
          // this.payuform.udf5 = this.fillPaymentForm.udf5;
         
   

//           var form3 = document.createElement("form");
// form3.setAttribute("method", "post");
// form3.setAttribute("action", "https://sandboxsecure.payu.in/_payment");

// // setting form target to a window named 'formresult'
// form3.setAttribute("target", "_blank");

// var hiddenField3 = document.createElement("input"); 
// // hiddenField.setAttribute('visibility', 'hidden');

// hiddenField3.setAttribute("firstname", this.fillPaymentForm.firstname);
// hiddenField3.setAttribute("txnid", this.fillPaymentForm.txnid);
// hiddenField3.setAttribute("email", this.fillPaymentForm.email);
// hiddenField3.setAttribute("phone",this.fillPaymentForm.phone);
// hiddenField3.setAttribute("hash", this.fillPaymentForm.hash);
// hiddenField3.setAttribute("key", this.fillPaymentForm.key);
// hiddenField3.setAttribute("amount", this.fillPaymentForm.amount);
// hiddenField3.setAttribute("productinfo", this.fillPaymentForm.productinfo);
// hiddenField3.setAttribute("udf1", this.fillPaymentForm.udf1);
// hiddenField3.setAttribute("udf2", this.fillPaymentForm.udf2);
// hiddenField3.setAttribute("udf3", this.fillPaymentForm.udf3);
// hiddenField3.setAttribute("udf4", this.fillPaymentForm.udf4);
// hiddenField3.setAttribute("udf5", this.fillPaymentForm.udf5);
// hiddenField3.setAttribute("service_provider", "payu_paisa");

// form3.appendChild(hiddenField3);
// document.body.appendChild(form3);


         // window.open("https://sandboxsecure.payu.in/_payment", 'formresult', 'scrollbars=no,menubar=no,height=600,width=800,resizable=yes,toolbar=no,status=no');

        this.disablePaymentButton = false;

      sessionStorage.setItem("productinfo", data["udf3"]);
  this.razorpayId = data["udf3"];

      
        // n.submit(); 
        //  window.open("https://sandboxsecure.payu.in/_payment", "_blank");  
     // window.location.href='https://sandboxsecure.payu.in/_payment';
    // form.submit();
     this.razorpayId = data["productinfo"];
   }

     // this.navigateTo(this.razorpayId);
    //  e.target.submit();
      // this.paymentPayumoney2(e);
       // e.target.submit();
     //   this.http
     //  .post('https://sandboxsecure.payu.in/_payment', JSON.stringify(this.cartForm.value)) 
     //  .subscribe(res =>{ 
     // },
     // this.paymentPayumoney2(form2,this.razorpayId);
      error => {}
   } );
    this.loader = true;
  }
paymentPayumoney2(e,r){
    e.submit();
    window.open("https://sandboxsecure.payu.in/_payment", 'formresult', 'scrollbars=no,menubar=no,height=600,width=800,resizable=yes,toolbar=no,status=no');
  this.navigateTo(r);
  
    // e.target.submit();
    //  window.location.href='https://sandboxsecure.payu.in/_payment';
  }
  //start for paymentMethod paytm

//start for payumoney
//start for paytmpaymentPaytm(form:any,e) {
   paymentPaytm(){
    this.loader = false;
    if (this.buy_now == true) {
      this.sendDataToAPIRazorpay["product_no"] = sessionStorage.getItem(
        "product_no2"
      );
      this.sendDataToAPIRazorpay["rate_type"] = sessionStorage.getItem(
        "rate_buy"
      );
    }
    this.adminservice.payment(this.sendDataToAPI).subscribe(data => {
      this.loader = true;
      this.fillPaytmForm = {
            MID: data["MID"],
            WEBSITE: data["WEBSITE"],
            ORDER_ID:data["ORDER_ID"],
            CUST_ID: data["CUST_ID"],
            MOBILE_NO:data["MOBILE_NO"],
            EMAIL: data["EMAIL"],
            INDUSTRY_TYPE_ID: data["INDUSTRY_TYPE_ID"],
            CHANNEL_ID: data["CHANNEL_ID"],
            TXN_AMOUNT: data["TXN_AMOUNT"],
            CALLBACK_URL: data["CALLBACK_URL"],
            CHECKSUMHASH: data["CHECKSUMHASH"],
         
            // curl:"https://ecomtrails.com/ecom_api/index.php/transaction/transaction_of_orders"
          };
         

      sessionStorage.setItem("productinfo", data["productinfo"]);
  this.razorpayId = data["productinfo"];

     this.razorpayId = data["productinfo"];

      error => {}
   } );
    this.loader = true;
  }
//   paymentPaytm(form:any,e) {
//     this.loader = false;
//     if (this.buy_now == true) {
//       this.sendDataToAPIRazorpay["product_no"] = sessionStorage.getItem(
//         "product_no2"
//       );
//       this.sendDataToAPIRazorpay["rate_type"] = sessionStorage.getItem(
//         "rate_buy"
//       );
//     }
//     this.adminservice.payment(this.sendDataToAPI).subscribe(data => {
//       this.loader = true;
//       this.fillPaytmForm = {
//             MID: data["MID"],
//             WEBSITE: data["WEBSITE"],
//             ORDER_ID:data["ORDER_ID"],
//             CUST_ID: data["CUST_ID"],
//             MOBILE_NO:data["MOBILE_NO"],
//             EMAIL: data["EMAIL"],
//             INDUSTRY_TYPE_ID: data["INDUSTRY_TYPE_ID"],
//             CHANNEL_ID: data["CHANNEL_ID"],
//             TXN_AMOUNT: data["TXN_AMOUNT"],
//             CALLBACK_URL: data["CALLBACK_URL"],
//             CHECKSUMHASH: data["CHECKSUMHASH"],
         
//             // curl:"https://ecomtrails.com/ecom_api/index.php/transaction/transaction_of_orders"
//           };

         
//             form.MID=this.fillPaytmForm.MID;
//           form.WEBSITE=this.fillPaytmForm.WEBSITE;
         
//           form.ORDER_ID=this.fillPaytmForm.ORDER_ID;
          
//           form.CUST_ID=this.fillPaytmForm.CUST_ID;
//           form.MOBILE_NO=this.fillPaytmForm.MOBILE_NO;

//           form.EMAIL=this.fillPaytmForm.EMAIL;
//           form.INDUSTRY_TYPE_ID=this.fillPaytmForm.INDUSTRY_TYPE_ID;
         
//           form.CHANNEL_ID=this.fillPaytmForm.CHANNEL_ID;
          
//           form.TXN_AMOUNT=this.fillPaytmForm.TXN_AMOUNT;
//           form.CALLBACK_URL=this.fillPaytmForm.CALLBACK_URL;
//          form.CHECKSUMHASH=this.fillPaytmForm.CHECKSUMHASH;
         
         
//           form.setAttribute("method", "post");
// form.setAttribute("action", "https://securegw-stage.paytm.in/order/process");

// // setting form target to a window named 'formresult'
// form.setAttribute("target", "_blank");
// form.setAttribute("method", "post");




//           var form2 = document.createElement("form");
// form2.setAttribute("method", "post");
// form2.setAttribute("action", "https://securegw-stage.paytm.in/order/process");

// // setting form target to a window named 'formresult'
// form2.setAttribute("target", "_blank");

// var hiddenField = document.createElement("input"); 


// hiddenField.setAttribute("MID", this.fillPaytmForm.MID);
// hiddenField.setAttribute("WEBSITE", this.fillPaytmForm.WEBSITE);
// hiddenField.setAttribute("ORDER_ID", this.fillPaytmForm.ORDER_ID);
// hiddenField.setAttribute("CUST_ID",this.fillPaytmForm.CUST_ID);
// hiddenField.setAttribute("MOBILE_NO", this.fillPaytmForm.MOBILE_NO);
// hiddenField.setAttribute("EMAIL", this.fillPaytmForm.EMAIL);
// hiddenField.setAttribute("INDUSTRY_TYPE_ID", this.fillPaytmForm.INDUSTRY_TYPE_ID);
// hiddenField.setAttribute("CHANNEL_ID", this.fillPaytmForm.CHANNEL_ID);
// hiddenField.setAttribute("TXN_AMOUNT", this.fillPaytmForm.TXN_AMOUNT);
// hiddenField.setAttribute("CALLBACK_URL", this.fillPaytmForm.CALLBACK_URL);
// hiddenField.setAttribute("CHECKSUMHASH", this.fillPaytmForm.CHECKSUMHASH);

// form2.appendChild(hiddenField);
// document.body.appendChild(form2);



// form.submit();
    
//      // window.open("https://sandboxsecure.payu.in/_payment", "_blank");
//      // window.open("https://securegw-stage.paytm.in/order/process", "_blank");
     
  

  
//         // this.disablePaymentButton = false;

//       sessionStorage.setItem("productinfo", data["productinfo"]);
//   this.razorpayId = data["productinfo"];

//      this.razorpayId = data["productinfo"];
// // this.paytm2(form);
//      // this.navigateTo(this.razorpayId);
    
//       error => {}
//    } );
//     this.loader = true;
//   }
  paytm2(form){
    form.submit();
     window.open("https://securegw-stage.paytm.in/order/process", "_blank");
     
    this.navigateTo(this.razorpayId);
    
  }
 //end for paytm
  // Razor pay
  paymentRazorpay() {
    this.loader = false;
    if (this.buy_now == true) {
      this.sendDataToAPIRazorpay["product_no"] = sessionStorage.getItem(
        "product_no2"
      );
      this.sendDataToAPIRazorpay["rate_type"] = sessionStorage.getItem(
        "rate_buy"
      );
    }
    this.adminservice.payment(this.sendDataToAPIRazorpay).subscribe(data => {
      this.loader = true;
      // var orders = data["order_id"];
      this.sendDataToAPIRazorpay.amount = data["amount"];
      this.rz_key=data['key'];
     
      this.razorpay_order_id = data["razorpay_order_id"];
      this.razorpayId = data["productinfo"];

      sessionStorage.setItem("productinfo", data["productinfo"]);

      this.initPay();
      this.navigateTo(this.razorpayId);
    });
    this.loader = true;
  }

  otpGenerate(data) {
    this.otpgeneration = false;
      this.loading=false;

    this.adminservice.otpGenerate(this.otpForm.value).subscribe(
      data => {
          this.loading=true;

        this.verify = false;
        if (data["status"] == "1") {
          this.otpgeneration = true;
          this.verify = true;
          this.snackbar.open(data["msg"], "", {
            duration: 3000,
            horizontalPosition: "center"
          });
        }
         this.otpgeneration = true;
      },
      error => {
          this.loading=true;

      }
    );
  }
  otpVerificationUser(data) {
      this.loading=false;

    this.adminservice.otpVerificationUser(this.otpForm.value).subscribe(
      data => {
          this.loading=true;

        if (data["status"] == "1") {
          this.otpgeneration = false;
          this.snackbar.open("OTP is verified successfully ", "", {
            duration: 3000,
            horizontalPosition: "center"
          });
          this.payment();
        } else {
           this.otpgeneration =true;
          this.snackbar.open("OTP is not valid ", "", {
            duration: 3000,
            horizontalPosition: "center"
          });
        }
      },
      error => {
          this.loading=true;
           this.otpgeneration =true;
        this.snackbar.open("Something went wrong,please try again.", "", {
          duration: 3000,
          horizontalPosition: "center"
        });
      }
    );
  }
  resendOtpVerify(data) {
      this.loading=false;

    this.adminservice.resendOtpVerify(this.otpForm.value).subscribe(
      data => {
        this.loading=true;

        if (data["status"] == "1") {
          this.snackbar.open(data["msg"], "", {
            duration: 3000,
            horizontalPosition: "center"
          });
        }
         this.verify = true;
      },
      error => {
         this.verify = true;
        this.loading=true;

      }
    );
  }
  check(form){
  }
  userNamefield() {
    let address = this.sendDataToAPI.billing_address_no;
    this.adminservice
      .getAddressSpecific({
        access_token: this.access_token,
        user_num: this.user_num,
        address_no: address
      })
      .subscribe(
        data => {
          if (data["status"] == 1) {
            this.otpAddress = data["result"][0];

            this.otpForm.get("username").setValue(this.otpAddress.email);
            this.otpForm.get("username").setValue(this.otpAddress.contact_no);
            this.register = this.otpForm.controls.username.value;
          } else if (data["status"] == 10) {
            sessionStorage.clear();
            this.snackbar.open(
              "Multiple login with this ID has been detected, Logging you out. ",
              "",
              {
                duration: 3000,
                horizontalPosition: "center"
              }
            );
            if (this.previewFlag == "1") {
 if ((sessionStorage.getItem("comp_num_new") == "0") && (this.host_name != "localhost:4209")) {
          // if ((sessionStorage.getItem("comp_num_new") == "0") && (this.host_name != "www.ecomtrails.com")) {
              this.router.navigate(["/Admin/preview/login"]);
               } else {
              this.router.navigate(["/login"]);
            }
            } else {
              this.router.navigate(["/login"]);
            }
          } else {
          }
        },
        error => {}
      );
  }
  pincode_api2(data) {
    let postData = { pin_code: data };
    this.adminservice.pincode_api(postData).subscribe(data => {
      if (data["status"] == 1) {
        if (data["result"]["PostOffice"] != null) {
          this.country_fetch2 = data["result"]["PostOffice"][0]["Country"];
          this.state_fetch2 = data["result"]["PostOffice"][0]["State"];
          this.city_fetch2 = data["result"]["PostOffice"][0]["District"];
          this.registerForm2.get("state").setValue(this.state_fetch2);

          this.registerForm2.get("city").setValue(this.city_fetch2);

          this.adminservice
            .pincode_country_state_city_api({
              Country: this.country_fetch2,
              State: this.state_fetch2,
              District: this.city_fetch2
            })
            .subscribe(data => {
              if (data["status"] == 1) {
                this.registerForm2
                  .get("state_id")
                  .setValue(data["state"]["state_id"]);
                this.registerForm2
                  .get("country_id")
                  .setValue(data["country"]["country_id"]);
                this.registerForm2
                  .get("city_id")
                  .setValue(data["city"]["city_id"]);
              }
            });
        } else {
          this.registerForm2.get("state").setValue("");

          this.registerForm2.get("city").setValue("");
          this.registerForm2
            .get("state_id")
            .setValue(this.updateAddres.state_id);
          this.registerForm2
            .get("country_id")
            .setValue(this.updateAddres.country_id);
          this.registerForm2.get("city_id").setValue(this.updateAddres.city_id);
        }
        // this.countries = data['result'];
        // this.bankForm.get('ifsc').setValue(this.bankInfo.ifsc);
      }
    });
  }

  pincode_api(data) {
    let postData = { pin_code: data };
    this.adminservice.pincode_api(postData).subscribe(data => {
      if (data["status"] == 1) {
        if (data["result"]["PostOffice"] != null) {
          this.country_fetch = data["result"]["PostOffice"][0]["Country"];
          this.state_fetch = data["result"]["PostOffice"][0]["State"];
          this.city_fetch = data["result"]["PostOffice"][0]["District"];
          this.registerForm.get("state").setValue(this.state_fetch);

          this.registerForm.get("city").setValue(this.city_fetch);

          this.adminservice
            .pincode_country_state_city_api({
              Country: this.country_fetch,
              State: this.state_fetch,
              District: this.city_fetch
            })
            .subscribe(data => {
              if (data["status"] == 1) {
                this.registerForm
                  .get("state_id")
                  .setValue(data["state"]["state_id"]);
                this.registerForm
                  .get("country_id")
                  .setValue(data["country"]["country_id"]);
                this.registerForm
                  .get("city_id")
                  .setValue(data["city"]["city_id"]);
              }
            });
        } else {
          this.registerForm.get("state").setValue("");

          this.registerForm.get("city").setValue("");

          this.registerForm.get("state_id").setValue("");
          this.registerForm.get("country_id").setValue("");
          this.registerForm.get("city_id").setValue("");
        }
        // this.countries = data['result'];
        // this.bankForm.get('ifsc').setValue(this.bankInfo.ifsc);
      }
    });
  }
  get_profile(){
      let postData = { user_num: this.user_num,access_token:this.access_token };
    this.adminservice.get_profile(postData).subscribe(data => {
      if (data["status"] == 1) {
        this.registerForm.get("email").setValue(data["result"].email);

          this.registerForm.get("contact_no").setValue(data["result"].mobile);

         
      }
    });
  }

  forpayment(){
    this.forpaymentshow = true;
    this.forpaymenthide = false;
  }
  forpayment2(){
    alert("Please add address");
  }

  coupon_code(couponform){
    if(couponform.value.coupon==null){
      this.snackbar.open("ENTER COUPON CODE","",{duration: 5000,horizontalPosition: "center"});
    }
    else{
    if(this.coupon_count==1){
    this.coupon_count = 0;
    this.temp_amt = this.fees;
    this.sendDataToAPIRazorpay['coupon_code']=couponform.value.coupon;
    this.sendDataToAPIRazorpay['net_amt']=this.sendDataToAPIRazorpay.amount;
    
    this.sendDataToAPI['coupon_code']=couponform.value.coupon;
    this.sendDataToAPI['inventory_amt']=this.net_amt2;
    this.sendDataToAPI['shipping_amt']=this.shipping_amt;
    
     this.sendDataToAPI['cart_id']=this.cart_id2;
     this.sendDataToAPI['comp_num']=sessionStorage.getItem("comp_num_new");

    this.adminservice.fetch_coupon_code(this.sendDataToAPI).subscribe(data => {
        if (data["status"] == 10) {
           this.snackbar.open("Multiple login with this ID has been detected, Logging you out. ","",{duration: 5000,horizontalPosition: "center"});
          this.router.navigate(["/login"]);
        }
      if(data['status'] == 1){
        this.promo_cod2=data['disc_price'];
        this.coupon_log_id=data['id'];
        this.promo_cod=true;
        //console.log(this.shipping_amt);

        //console.log(JSON.parse(this.shipping_amt));
         //console.log(parseInt(this.shipping_amt));
         this.save_promo2=JSON.parse(this.shipping_amt)+this.promo_cod2;
       //console.log(this.save_promo2);
        this.save_promo=parseInt(this.discount_promo)+this.promo_cod2;
        //console.log(this.save_promo);
        this.snackbar.open(
          "Coupon applied succesfully",
          "",
          {
            duration: 5000,
            horizontalPosition: "center"
          }
        );
      // this.cc = data["result"];
      this.temp_amt = this.fees;
      this.fees = this.sendDataToAPIRazorpay.amount;
      }
      else{
        this.promo_cod=false;
        this.coupon_count = 1;
        this.snackbar.open(
          data['msg'],
          "",
          {
            duration: 5000,
            horizontalPosition: "center"
          }
        );
      }
    });
    }
    }
  }
disab(){
    this.coupon_count=1;
    this.fees = this.temp_amt;
    this.promo_cod=false;
  }
  //start Priyangee 15/08/2020
   compSettings2() {
    this.adminservice
      .fetch_particular_company_registry_with_sno({ comp_num:  sessionStorage.getItem("comp_num_new"),s_no:16 })
      .subscribe(data => {
        if (data["status"] == 1) {
         let d = data['data'];
         let v = JSON.parse(d.value);
         if(v== "1"){
           this.ship_ask=false;
            // start for ship_ask
            this.adminservice
      .fetch_particular_company_registry_with_sno({ comp_num:  sessionStorage.getItem("comp_num_new"),s_no:17 })
      .subscribe(data => {
        if (data["status"] == 1) {
         let d = data['data'];
         let v = d.value;
         
           this.ship_charge=JSON.parse(v);
           this.shipping_amt=JSON.parse(v);
        
         
        } else {
          
        }
      });
           // end for ship
         }
         else{
          
         }
         
        } else {
          
        }
      });
  }
 
  compSettings() {
    this.adminservice
      .getparticularCompSetting({ comp_num: sessionStorage.getItem("comp_num_new"), s_no:13})
      .subscribe(data => {
     


        if (data["status"] == 1) {
          // if(data['data'].length>0){
          //   for(let k=0;k<data['data'].length;k++){
              // if(data['data'].s_no==13 || data['data'].s_no=='13'){
                if(data['data'].value==0 || data['data'].value=='0'){
                  this.cod_otp_enable=false;
                }
              // }
          //   }
          // }
         }
      });
  }
//   resolved(captchaResponse: string, res) {
//   //console.log(`Resolved response token: ${captchaResponse}`);
//  this.payment();
// }
  //end Priyangee 15/08/2020
}

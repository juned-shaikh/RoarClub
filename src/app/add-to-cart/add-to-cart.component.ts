
import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { RoarclubserviceService } from "../roarclubservice.service";
import {MatSnackBar} from  '@angular/material/snack-bar'
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { timer, Subject, Observable, BehaviorSubject } from "rxjs";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent implements OnInit {
  public products: any;
  public totalPrice = 0;
 total_mrp=0;
   userC = false;
  estimate_self=false;
  ship_ask=true;
total_entity=0;
 total_shipp=0;
   estimate_count=0;
  etd="5-6 days";
is_national=false;
  is_estimate=false;
 total_nett=0;
  total_discount=0;
  notbuy=true;
  stock;
       stockCheck=false;    
  public loader = false;
  result_rates;
  rentShow=false;
  ship_charge;
  // public isLoggedIn = false;
  public isLoggedIn = false;
  public isLoginEmpty;
  public isLoginFull;
  specificCart;
  specificCart2 = [];
  public isLoggedOut;
  net_amount = 0.0;
  price_amount = 0.0;
host_name;
  user_num = sessionStorage.getItem("user_num");
  access_token = sessionStorage.getItem("access_token");
comp=sessionStorage.getItem("comp_num_new");
  public isLoggedOutPro;
  public isLoggedInPro = false;
  registerForm2: FormGroup;
  registerForm3: FormGroup;
  resultPro;
  otpForm: FormGroup;

  ca;
  c;
  cart;
  load=0;
  count=0;
  previewFlag = sessionStorage.getItem('previewFlag');
private prodCount = 0;
    prodCountCountChange: Subject<number> = new Subject<number>();
  constructor(
    private snackbar: MatSnackBar,
    private router: Router,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,

    private adminService: RoarclubserviceService,
    private cookie: CookieService
  ) {}
  openXl(content) {
    this.modalService.open(content, { size: "sm" });
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
  ngOnInit() {
        this.compSettings2(this.comp);

    if (
      sessionStorage.getItem("user_num") &&
      sessionStorage.getItem("user_num") != null && sessionStorage.getItem("user_num") != ''
    ) {
      this.userC = true;
    }
      let l = location.origin;
    var c = l.split("//");
    this.host_name = c[1];

    this.compSettings(this.comp);
    this.registerForm2 = this.formBuilder.group({
      rate_type: [""],
      qty: [""],
      cart_id: [""],
      cart_inventory_id: [""],
      user_num: sessionStorage.getItem("user_num"),
      comp_num: sessionStorage.getItem("comp_num_new"),
      access_token: sessionStorage.getItem("access_token")
    });
    this.registerForm3 = this.formBuilder.group({
      rate_type: [""],
      qty: [""],
      cart_id: [""],
      cart_inventory_id: [""],
      user_num: sessionStorage.getItem("user_num"),
      comp_num: sessionStorage.getItem("comp_num_new"),
      access_token: sessionStorage.getItem("access_token")
    });
    // start 24/08/2020 for estimate delivery timer
 this.otpForm = this.formBuilder.group({
      cod: ["1"],
      comp_num: sessionStorage.getItem("comp_num_new"),
      delivery_postcode:[""],
      weight:[""]
    });
//start 21/08/2020
this.compSettings(this.comp);
//end 21/08/2020

    // end 24/08/2020 fr estimate delivery time
    if (
      (sessionStorage.getItem("user_num") === "" &&
        sessionStorage.getItem("access_token") === "") ||
      (sessionStorage.getItem("user_num") === null &&
        sessionStorage.getItem("access_token") === null)
    ) {
      this.loader = false;

      this.isLoggedOut = true;

      this.isLoggedIn = false;

      if (
        this.cookie.get("product_id2") === null ||
        this.cookie.get("product_id2") === ""
      ) {
        this.isLoggedOutPro = true;
        this.loader = true;
      } else {
        this.loader = false;
        this.isLoggedOutPro = false;

        var quotes = this.cookie.get("product_id2");

        var d = quotes.replace(/%2C/g, ",");
        var d1 = d.split(",");

        var dn = quotes.replace(/,""/g, "");
         //start for qty
         var quotesQ = this.cookie.get("quantity");
        var dQ = quotesQ.replace(/%2C/g, ",");
        var d1Q = dQ.split(",");

        var dnQ = quotesQ.replace(/,""/g, "");
        //en for qty
        var postData2 = { product_no: "", comp_num: "" };
        postData2.product_no = dn;
         postData2['quantity']=dnQ;
        postData2.comp_num = sessionStorage.getItem("comp_num_new");

        this.adminService.fethcProductWishlist(postData2).subscribe(data => {
          this.loader = false;
          if (data["status"] == "1") {
             this.count = data['wishlist'].length;
                this.adminService.cartCount.next(this.count);
             // this.adminService.updateCartCount();
            this.isLoggedOutPro = false;

            this.isLoggedInPro = true;

            this.products = data["wishlist"];
            this.total_mrp=data["total_mrp"];
            this.total_discount=data["total_discount"];
          this.total_entity=data['total_entity'];

            this.total_shipp=data["total_shipping"];
            this.total_nett=data["total_net"];
             this.net_amount =this.total_nett-this.total_shipp;
             //start for estimate time delivery 24/08/2020
 if( this.estimate_self==true){
      this.otpForm.get("delivery_postcode").setValue('452003');
//.console.log(1);
         // this.estimate_time_delivery();
    }
//end for estimate time delivery 24/08/2020
           if(this.is_estimate==true){
            for (let i = 0; i < this.products.length; i++) {
               
          
              this.otpForm.get("weight").setValue(this.products[i].product.final_weight);
              this.estimate_time_delivery();
              this.products[i].etd=this.etd;
            
            }
              
            }
          } else {
            this.isLoggedInPro = false;
            this.isLoggedOutPro = true;
            this.loader = true;
          }
          this.loader = true;
        });
      }
    } else if (
      (sessionStorage.getItem("user_num") != "" &&
        sessionStorage.getItem("access_token") != "") ||
      (sessionStorage.getItem("user_num") != null &&
        sessionStorage.getItem("access_token") != null)
    ) {
      this.loader = false;
      this.isLoggedIn = true;
      this.isLoggedOut = false;
      this.getAddresses();


      if (
        this.cookie.get("product_id2") != null ||
        this.cookie.get("product_id2") != ""
      ) {
        var quotes = this.cookie.get("product_id2");

        var d = quotes.replace(/%2C/g, ",");

        var d1 = d.split(",");

        var dn = quotes.replace(/%2C/g, "");

        //start rate_type
        var quotesR = this.cookie.get("rate_type");

        var dR = quotesR.replace(/%2C/g, ",");

        var d1R = dR.split(",");

        var dnR = quotesR.replace(/%2C/g, "");
        //end rate_type
        //start for qty
         var quotesQ = this.cookie.get("quantity");
        var dQ = quotesQ.replace(/%2C/g, ",");
        var d1Q = dQ.split(",");

        var dnQ = quotesQ.replace(/,""/g, "");
        //en for qty

        var postData = {
          product_no: "",
          access_token: "",
          user_num: "",
          rate_type: "",
          comp_num: ""
        };
        postData.product_no = dn;
         postData['quantity']=dnQ;
        postData.rate_type = dnR;
        postData.access_token = sessionStorage.getItem("access_token");
        postData.user_num = sessionStorage.getItem("user_num");
        postData.comp_num = sessionStorage.getItem("comp_num_new");

        this.adminService.addToCartWL(postData).subscribe(data => {
          if (data["status"] == "1") {
            // cart cunt start
            this.adminService.fetch_cart_count(postData).subscribe(data => {
              if (data["status"] == "1") {
                this.count = data['cart_count'];
                this.adminService.cartCount.next(this.count);
              }
            });
            // cart count end
         
             // this.adminService.updateCartCount();
            if(this.previewFlag == '1'){
              if ((sessionStorage.getItem("comp_num_new") == "0") && (this.host_name != "localhost:4209")) {
                  this.router
                  .navigateByUrl("/RefreshComponent", {
                    skipLocationChange: true
                  })
                  .then(() => this.router.navigate(["/Admin/preview/my-cart"]));
              }else{
                this.router
                .navigateByUrl("/RefreshComponent", {
                  skipLocationChange: true
                })
                .then(() => this.router.navigate(["/my-cart"]));

              }

            }else{
              this.router
              .navigateByUrl("/RefreshComponent", {
                skipLocationChange: true
              })
              .then(() => this.router.navigate(["/my-cart"]));

            }
            

            // this.adminService.updateCartCount();
          }
        });
      }
      this.getAddresses();

      // this.estimate_time_delivery();
      this.getCart();

      

      // ===========for login without wishlist=========================
    }

  
  }

  getCart() {
    this.isLoggedOut = false;
    this.loader = false;
    var postData = { user_num: "", access_token: "", comp_num: "" };
    postData.user_num = sessionStorage.getItem("user_num");
    postData.access_token = sessionStorage.getItem("access_token");
    postData.comp_num = sessionStorage.getItem("comp_num_new");
    if (postData.user_num != "" || postData.access_token != "") {
      this.adminService.fetchCart(postData).subscribe(data => {
        //
        if (data["status"] == "1") {
          this.isLoggedIn = true;
          this.isLoggedOut = false;
          this.isLoginFull = true;
          this.cart = data["cart"];
          this.total_entity=data['total_entity'];
          this.c = this.cart.cart_inventory;
          for(let check =0;check<this.c.length;check++){
            if(this.c[check].product.txn_quantity < '1' || this.c[check].product.txn_quantity < 1){
              this.stockCheck =true;
            }
           
             
            
            var rate_type_actual=this.c[check].rate_type;
            this.cart.cart_inventory[check].rate_type_actual=rate_type_actual;
             // estimate_time_delivery24/08/2020
            if(this.is_estimate==true){
             this.otpForm.get("weight").setValue(this.c[check].product.final_weight);
              this.estimate_time_delivery();
            }
            
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
          this.isLoggedIn = true;
          this.isLoginEmpty = true;
          this.loader = true;
          
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

  deleteFromCart(id) {
    var res = confirm("Are you sure you want to delete this cart.");
    if (res) {
      this.loader = false;
      this.isLoggedIn = true;
      var postData = {
        user_num: "",
        access_token: "",
        cart_inventory_id: "",
        comp_num: sessionStorage.getItem("comp_num_new")
      };
      postData.user_num = sessionStorage.getItem("user_num");
      postData.access_token = sessionStorage.getItem("access_token");
      postData.cart_inventory_id = id;

      var cart = { cart_inventory_id: "" };
      cart.cart_inventory_id = id;
      this.deleteFromCartF(postData);
      
    }
  }

  deleteFromCartF(postData) {
    this.isLoggedIn = true;
    // var products = this.resultPro["product_no"];
    this.cookie.delete("product_id2");
    this.cookie.delete("rate_type");
     this.cookie.delete("quantity");
    this.adminService.deleteCart(postData).subscribe(data => {
      if (data["status"] == "1") {
   
        this.updateCartCount();
        this.loader = true;
        // window.location.reload();
        if(this.previewFlag == '1'){
           if ((sessionStorage.getItem("comp_num_new") == "0") && (this.host_name != "localhost:4209")) {
          // if ((sessionStorage.getItem("comp_num_new") == "0") && (this.host_name != "www.ecomtrails.com")) {
            this.router
            .navigateByUrl("/RefreshComponent", {
              skipLocationChange: true
            })
            .then(() => this.router.navigate(["/Admin/preview/my-cart"]));
          }else{
            this.router
            .navigateByUrl("/RefreshComponent", {
              skipLocationChange: true
            })
            .then(() => this.router.navigate(["/my-cart"]));

          }

        }else{
          this.router
          .navigateByUrl("/RefreshComponent", {
            skipLocationChange: true
          })
          .then(() => this.router.navigate(["/my-cart"]));

        }
        
      } else if (data["status"] == "10") {
        if(this.previewFlag == '1'){
          if ((sessionStorage.getItem("comp_num_new") == "0") && (this.host_name != "localhost:4209")) {
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
        if (sessionStorage.getItem("access_token") == "") {
          if(this.previewFlag == '1'){
            if ((sessionStorage.getItem("comp_num_new") == "0") && (this.host_name != "localhost:4209")) {
 
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
      this.loader = true;
    });
  }

  updateCart(id, qty, product, rate_type, product_no) {
    this.isLoggedIn = true;
    var postData = {
      user_num: "",
      access_token: "",
      cart_id: "",
      qty: "",
      rate_type: "",
      product_no: "",
      comp_num: ""
    };
    postData.user_num = sessionStorage.getItem("user_num");
    postData.access_token = sessionStorage.getItem("access_token");
    postData.cart_id = id;
    postData.product_no = product_no;
    postData.comp_num = sessionStorage.getItem("comp_num_new");

    postData.rate_type = rate_type;
    postData.qty = qty;

    if (qty < 1) {
      this.snackbar.open("Choose Valid quantity.", "", {
        duration: 3000
      });
      this.getCart();
    } else if (qty <= product) {
      this.adminService.updateCart(postData).subscribe(data => {
        this.isLoggedOut = false;
        this.isLoggedIn = true;
        this.loader = false;
        if (data["status"] == "1") {
          this.loader = true;
          this.snackbar.open("Updated Cart Successfully", "", {
            duration: 3000
          });
          this.updateCartCount();
           this.getCart();
          if(this.previewFlag == '1'){
            if ((sessionStorage.getItem("comp_num_new") == "0") && (this.host_name != "localhost:4209")) {
                // this.router
                // .navigateByUrl("/RefreshComponent", {
                //   skipLocationChange: true
                // })
                // .then(() => this.router.navigate(["/Admin/preview/my-cart"]));
            }else{
              // this.router
              // .navigateByUrl("/RefreshComponent", {
              //   skipLocationChange: true
              // })
              // .then(() => this.router.navigate(["/my-cart"]));
    
            }
  
          }else{
            // this.router
            // .navigateByUrl("/RefreshComponent", {
            //   skipLocationChange: true
            // })
            // .then(() => this.router.navigate(["/my-cart"]));
  
          }
        } else if (data["status"] == "10") {
          this.router
            .navigateByUrl("/RefreshComponent", {
              skipLocationChange: true
            })
            .then(() => this.router.navigate(["/login"]));
        } else {
          this.loader = true;
          this.snackbar.open("This cart is not update..!", "", {
            duration: 3000
          });
          if (sessionStorage.getItem("access_token") == "") {
            if(this.previewFlag == '1'){
               if ((sessionStorage.getItem("comp_num_new") == "0") && (this.host_name != "localhost:4209")) {
                  this.router
                  .navigateByUrl("/RefreshComponent", {
                    skipLocationChange: true
                  })
                  .then(() => this.router.navigate(["/Admin/preview/my-cart"]));
                }else{
                  this.router
                  .navigateByUrl("/RefreshComponent", {
                    skipLocationChange: true
                  })
                  .then(() => this.router.navigate(["/my-cart"]));
        
                }
    
            }else{
              this.router
              .navigateByUrl("/RefreshComponent", {
                skipLocationChange: true
              })
              .then(() => this.router.navigate(["/my-cart"]));
    
            }
          }
        }
        this.loader = true;
      });
    } else {
      this.loader = true;

      this.snackbar.open("This quantity is not available.", "", {
        duration: 3000
      });
      this.getCart();
    }
  }

  addToWishlist(product) {
    var postData = {
      user_num: "",
      access_token: "",
      product_no: "",
      comp_num: ""
    };
    postData.user_num = sessionStorage.getItem("user_num");
    postData.access_token = sessionStorage.getItem("access_token");
    postData.product_no = product.id;
    postData.comp_num = sessionStorage.getItem("comp_num_new");
    

    if (postData.user_num == "" || postData.access_token == "") {
      this.snackbar.open("Please Login To Add Product in Wishlist", "", {
        duration: 1000
      });
      this.router.navigate(["/login"]);
    } else {
      if (product.is_wishlist == "True") {
        this.snackbar.open("Already Exists in Wishlist", "", {
          duration: 1000
        });
      } else {
        this.adminService.addWishlist(postData).subscribe(data => {
         
          this.snackbar.open("Added to Wishlist", "", {
            duration: 1000
          });
          this.ngOnInit();
        });
      }
    }
  }

  updateCartCount() {
    // updateCount(count: number = 0): void {
    // this.prodCount = this.c.length;
    // this.prodCountCountChange.next(this.prodCount);
// }
    this.adminService.updateCartCount();
  }

  getImage(image): string {
    return this.adminService.getThumbnail1(image);
  }
 
  checkout() {
    if(this.stockCheck ==true){
      alert("Firstly remove out of stock products from cart.");
    }
    else{
      if (this.previewFlag == "1") {
         if ((sessionStorage.getItem("comp_num_new") == "0") && (this.host_name != "localhost:4209")) {
             
          // this.router
          //   .navigateByUrl("/RefreshComponent", {
          //     skipLocationChange: true
          //   })
          //   .then(() => 
            this.router.navigate(["/Admin/preview/checkout"]);
            } else {
          // this.router
          //   .navigateByUrl("/RefreshComponent", {
          //     skipLocationChange: true
          //   })
          //   .then(() => 
            this.router.navigate(["/checkout"]);
        }
      } else {
        // this.router
        //   .navigateByUrl("/RefreshComponent", {
        //     skipLocationChange: true
        //   })
        //   .then(() =>
           this.router.navigate(["/checkout"]);
      }
    }
   
  }
  WtoutLoginCheckout() {
    this.snackbar.open("Please Login to Checkout ", "", {
      duration: 3000,
      horizontalPosition: "center"
    });
    if (this.previewFlag == "1") {
       if ((sessionStorage.getItem("comp_num_new") == "0") && (this.host_name != "localhost:4209")) {
                   sessionStorage.setItem("routes", this.router.url);

         this.router.navigate(["/Admin/preview/login"]);
       }
       else{
          sessionStorage.setItem("routes", this.router.url);
           
         this.router.navigate(["/login"]);
          
       }
           

    } else {
        sessionStorage.setItem("routes", this.router.url);
         
      this.router.navigate(["/login"]);
    }
    
  }
  fetch_cart_specific(cart_id, cart_inventory_id) {
    this.adminService
      .fetch_cart_specific({
        access_token: this.access_token,
        user_num: this.user_num,
        cart_inventory_id: cart_inventory_id,
        cart_id: cart_id,
        comp_num: sessionStorage.getItem("comp_num_new")
      })
      .subscribe(
        data => {
          if (data["status"] == 1) {
            this.specificCart = data["cart"];
            this.stock=parseInt(this.specificCart.cart_inventory.product.txn_quantity);

            this.result_rates = this.specificCart.cart_inventory.product_rate;

            this.registerForm2
              .get("rate_type")
              .setValue(this.specificCart.cart_inventory.rate_type);

            this.registerForm2
              .get("qty")
              .setValue(this.specificCart.cart_inventory.qty);
            this.registerForm2.get("cart_id").setValue(cart_id);
            this.registerForm2
              .get("cart_inventory_id")
              .setValue(cart_inventory_id);
            for (let k = 0; k < this.result_rates.length; k++) {
            
                if (
                this.result_rates[k].is_rent != "2" &&
                this.result_rates[k].is_rent != 2
              ) {
                  if(this.result_rates[k].is_rent == '1' || this.result_rates[k].is_rent == 1){
                     if( this.rentShow){
                        this.specificCart2.push(this.result_rates[k]);
                     }
                  }
                   if(this.result_rates[k].is_rent == '0' || this.result_rates[k].is_rent == 0){
                     if( this.notbuy){
                        this.specificCart2.push(this.result_rates[k]);
                     }
                  }
               
              }
            }
          
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
            this.router.navigate(["/login"]);
          } else {
          }
        },
        error => {}
      );
  }

  updateCart2() {
    var qty = 1;
    this.isLoggedIn = true;

    if (qty < 1) {
      this.snackbar.open("Choose Valid quantity.", "", {
        duration: 3000
      });
      this.getCart();
    } else if (qty >= 1) {
      let data2 = this.registerForm2.value;

      this.adminService.updateCart(data2).subscribe(data => {
        this.isLoggedOut = false;
        this.isLoggedIn = true;
        this.loader = false;
        if (data["status"] == "1") {
          this.loader = true;
          
          this.updateCartCount();
           this.getCart();
           this.snackbar.open("Update Cart Successfully", "", {
            duration: 3000
          });
          if(this.previewFlag == '1'){
            if ((sessionStorage.getItem("comp_num_new") == "0") && (this.host_name != "localhost:4209")) {
              // this.router
              // .navigateByUrl("/RefreshComponent", {
              //   skipLocationChange: true
              // })
              // .then(() => this.router.navigate(["/Admin/preview/my-cart"]));
            }else{
              // this.router
              // .navigateByUrl("/RefreshComponent", {
              //   skipLocationChange: true
              // })
              // .then(() => this.router.navigate(["/my-cart"]));
    
            }
  
          }else{
            // this.router
            // .navigateByUrl("/RefreshComponent", {
            //   skipLocationChange: true
            // })
            // .then(() => this.router.navigate(["/my-cart"]));
  
          }
        } else if (data["status"] == "10") {
          this.router
            .navigateByUrl("/RefreshComponent", {
              skipLocationChange: true
            })
            .then(() => this.router.navigate(["/expired"]));
        } else {
          this.loader = true;
          this.snackbar.open("This cart is not update..!", "", {
            duration: 3000
          });
          if (sessionStorage.getItem("access_token") == "") {
            this.router
              .navigateByUrl("/RefreshComponent", {
                skipLocationChange: true
              })
              .then(() => this.router.navigate(["/expired"]));
          }
        }
        this.loader = true;
      });
    } else {
      this.loader = true;

      this.snackbar.open("This quantity is not available.", "", {
        duration: 3000
      });
      this.getCart();
    }
  }
  view_product(name, id,slug,quick) {
    if(quick=='N'){
    // let slug = name.replace(/\s/, "-") + "-?" + id;
    this.router
      .navigateByUrl("/RefreshComponent", {
        skipLocationChange: true
      })
      .then(() => this.router.navigate(["/product", slug]));
  }
  }
  getDiscount(price, discountPrice): string {
    let discount = Math.floor(((price - discountPrice) / price) * 100);
    return discount + " %";
  }
  checkQty(){
   
    let msg= "This product is greater than stock quantity, only"+this.stock+" stock quantity is available ";
    if(this.stock < this.registerForm2.controls.qty.value){
       this.snackbar.open(
             msg,
              "",
              {
                duration: 3000,
                horizontalPosition: "center"
              }
            );
        this.registerForm2
              .get("qty")
              .setValue(this.stock);
          
    }
  
  }

 updateCart3(cart_id,cart_inventory_id,rate_type_actual,qty,qty_stock) {
    // var qty = 1;
    this.isLoggedIn = true;

    if (qty < 1) {
      this.snackbar.open("Choose Valid quantity.", "", {
        duration: 3000
      });
      this.getCart();
    }
    else if(qty > parseInt(qty_stock)){
      let msg="only "+qty_stock+" quantity available.";
       this.snackbar.open(msg, "", {
        duration: 3000
      });
    }
     else if (qty >= 1) {
      let data2 = { rate_type: rate_type_actual,
      qty: qty,
      cart_id: cart_id,
      cart_inventory_id: cart_inventory_id,
      user_num: sessionStorage.getItem("user_num"),
      comp_num: sessionStorage.getItem("comp_num_new"),
      access_token: sessionStorage.getItem("access_token")
    }

      this.adminService.updateCart(data2).subscribe(data => {
        this.isLoggedOut = false;
        this.isLoggedIn = true;
        this.loader = false;
        if (data["status"] == "1") {
          this.loader = true;
          
          this.updateCartCount();
           this.getCart();
           this.snackbar.open("Update Cart Successfully", "", {
            duration: 3000
          });
          if(this.previewFlag == '1'){
             if ((sessionStorage.getItem("comp_num_new") == "0") && (this.host_name != "localhost:4209")) {
          // if ((sessionStorage.getItem("comp_num_new") == "0") && (this.host_name != "www.ecomtrails.com")) {
                // this.router
                // .navigateByUrl("/RefreshComponent", {
                //   skipLocationChange: true
                // })
                // .then(() => this.router.navigate(["/Admin/preview/my-cart"]));
              }else{
                // this.router
                // .navigateByUrl("/RefreshComponent", {
                //   skipLocationChange: true
                // })
                // .then(() => this.router.navigate(["/my-cart"]));
      
              }
  
          }else{
            // this.router
            // .navigateByUrl("/RefreshComponent", {
            //   skipLocationChange: true
            // })
            // .then(() => this.router.navigate(["/my-cart"]));
  
          }
        } else if (data["status"] == "10") {
          this.router
            .navigateByUrl("/RefreshComponent", {
              skipLocationChange: true
            })
            .then(() => this.router.navigate(["/expired"]));
        } else {
          this.loader = true;
          this.snackbar.open("This cart is not update..!", "", {
            duration: 3000
          });
          if (sessionStorage.getItem("access_token") == "") {
            this.router
              .navigateByUrl("/RefreshComponent", {
                skipLocationChange: true
              })
              .then(() => this.router.navigate(["/expired"]));
          }
        }
        this.loader = true;
      });
    } else {
      this.loader = true;

      this.snackbar.open("This quantity is not available.", "", {
        duration: 3000
      });
      this.getCart();
    }
  }

updateCart3minus(cart_id,cart_inventory_id,rate_type_actual,qty2,qty_stock) {
    // var qty = 1;
    this.isLoggedIn = true;
    var qty=parseInt(qty2)-1;
    if (qty < 1) {
      this.snackbar.open("Choose Valid quantity.", "", {
        duration: 3000
      });
      this.getCart();
    }
      else if (qty >= 1) {
      let data2 = { rate_type: rate_type_actual,
      qty: qty,
      cart_id: cart_id,
      cart_inventory_id: cart_inventory_id,
      user_num: sessionStorage.getItem("user_num"),
      comp_num: sessionStorage.getItem("comp_num_new"),
      access_token: sessionStorage.getItem("access_token")
    }

      this.adminService.updateCart(data2).subscribe(data => {
        this.isLoggedOut = false;
        this.isLoggedIn = true;
        this.loader = false;
        if (data["status"] == "1") {
          this.loader = true;
          
          this.updateCartCount();
           this.getCart();
           this.snackbar.open("Update Cart Successfully", "", {
            duration: 3000
          });
          if(this.previewFlag == '1'){
            if ((sessionStorage.getItem("comp_num_new") == "0") && (this.host_name != "localhost:4209")) {
          // if ((sessionStorage.getItem("comp_num_new") == "0") && (this.host_name != "www.ecomtrails.com")) {
 
                // this.router
                // .navigateByUrl("/RefreshComponent", {
                //   skipLocationChange: true
                // })
                // .then(() => this.router.navigate(["/Admin/preview/my-cart"]));
            }else{
              // this.router
              // .navigateByUrl("/RefreshComponent", {
              //   skipLocationChange: true
              // })
              // .then(() => this.router.navigate(["/my-cart"]));
    
            }
  
          }else{
            // this.router
            // .navigateByUrl("/RefreshComponent", {
            //   skipLocationChange: true
            // })
            // .then(() => this.router.navigate(["/my-cart"]));
  
          }
        } else if (data["status"] == "10") {
          this.router
            .navigateByUrl("/RefreshComponent", {
              skipLocationChange: true
            })
            .then(() => this.router.navigate(["/expired"]));
        } else {
          this.loader = true;
          this.snackbar.open("This cart is not update..!", "", {
            duration: 3000
          });
          if (sessionStorage.getItem("access_token") == "") {
            this.router
              .navigateByUrl("/RefreshComponent", {
                skipLocationChange: true
              })
              .then(() => this.router.navigate(["/expired"]));
          }
        }
        this.loader = true;
      });
    } else {
      this.loader = true;

      this.snackbar.open("This quantity is not available.", "", {
        duration: 3000
      });
      this.getCart();
    }
  }
  updateCart3plus(cart_id,cart_inventory_id,rate_type_actual,qty2,qty_stock) {
    // var qty = 1;
    this.isLoggedIn = true;
    var qty=parseInt(qty2)+1;
    if (qty < 1) {
      this.snackbar.open("Choose Valid quantity.", "", {
        duration: 3000
      });
      this.getCart();
    }
    else if(qty > parseInt(qty_stock)){
      let msg="only "+qty_stock+" quantity available.";
       this.snackbar.open(msg, "", {
        duration: 3000
      });
    } else if (qty >= 1) {
      let data2 = { rate_type: rate_type_actual,
      qty: qty,
      cart_id: cart_id,
      cart_inventory_id: cart_inventory_id,
      user_num: sessionStorage.getItem("user_num"),
      comp_num: sessionStorage.getItem("comp_num_new"),
      access_token: sessionStorage.getItem("access_token")
    }

      this.adminService.updateCart(data2).subscribe(data => {
        this.isLoggedOut = false;
        this.isLoggedIn = true;
        this.loader = false;
        if (data["status"] == "1") {
          this.loader = true;
         
          this.updateCartCount();
           this.getCart();
            this.snackbar.open("Update Cart Successfully", "", {
            duration: 3000
          });
          if(this.previewFlag == '1'){
            if ((sessionStorage.getItem("comp_num_new") == "0") && (this.host_name != "localhost:4209")) {
                // this.router
                // .navigateByUrl("/RefreshComponent", {
                //   skipLocationChange: true
                // })
                // .then(() => this.router.navigate(["/Admin/preview/my-cart"]));
            }else{
              // this.router
              // .navigateByUrl("/RefreshComponent", {
              //   skipLocationChange: true
              // })
              // .then(() => this.router.navigate(["/my-cart"]));
    
            }
    
  
          }else{
            // this.router
            // .navigateByUrl("/RefreshComponent", {
            //   skipLocationChange: true
            // })
            // .then(() => this.router.navigate(["/my-cart"]));
  
          }
        } else if (data["status"] == "10") {
          this.router
            .navigateByUrl("/RefreshComponent", {
              skipLocationChange: true
            })
            .then(() => this.router.navigate(["/expired"]));
        } else {
          this.loader = true;
          this.snackbar.open("This cart is not update..!", "", {
            duration: 3000
          });
          if (sessionStorage.getItem("access_token") == "") {
            this.router
              .navigateByUrl("/RefreshComponent", {
                skipLocationChange: true
              })
              .then(() => this.router.navigate(["/expired"]));
          }
        }
        this.loader = true;
      });
    } else {
      this.loader = true;

      this.snackbar.open("This quantity is not available.", "", {
        duration: 3000
      });
      this.getCart();
    }
  }
  compSettings2(dd) {
    console.log(dd);
    this.adminService
      .fetch_particular_company_registry_with_sno({ comp_num: dd,s_no:16 })
      .subscribe(data => {
        if (data["status"] == 1) {
         let d = data['data'];
         let v = JSON.parse(d.value);
         if(v== "1"){
           this.ship_ask=false;
           console.log(this.ship_ask);
            // start for ship_ask
            this.adminService
      .fetch_particular_company_registry_with_sno({ comp_num: dd,s_no:17 })
      .subscribe(data => {
        if (data["status"] == 1) {
         let d = data['data'];
         let v = d.value;
         
           this.ship_charge=JSON.parse(v);
        
         
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
  
   compSettings(dd) {
    this.adminService
      .getparticularCompSetting({ comp_num: dd })
      .subscribe(data => {
     


        if (data["status"] == 1) {
         
         //  let d = data['data'][6];
         // let v = d.value;
         // if(v== '2'){
         //   this.notbuy=false;
         // }
         // if(v == '2' || v == '3'){
         //   this.rentShow = true;

         // }else{
         //   this.rentShow = false;

         // }

        // start for estimate time 24/08/2020
         if(data['data'].length>0){
            for(let k=0;k<data['data'].length;k++){
               if(data['data'][k].s_no==7 || data['data'][k].s_no=='7'){
             
              let d = data['data'][k];
         let v = d.value;
         if(v== '2'){
           this.notbuy=false;
         }
         if(v == '2' || v == '3'){
           this.rentShow = true;

         }else{
           this.rentShow = false;

         }
       }


              if(data['data'][k].s_no==6 || data['data'][k].s_no=='6'){
                if(data['data'][k].value==0 || data['data'][k].value=='0' || data['data'][k].value==2 || data['data'][k].value=='2'){
                  this.is_estimate=true;
                }
                if(data['data'][k].value==2 || data['data'][k].value=='2'){
                  this.is_national=true;
                }
                 if( data['data'][k].value=='0'){
                this.estimate_self=true;
                }
              }
            }
          }
         
        // end for estimate time 24/08/2020
        } else {
          this.rentShow = false;
        }
      });
  }
  // start for 24/08/2020


getAddresses() {
    let postData = {
      user_num: sessionStorage.getItem("user_num"),
      access_token: sessionStorage.getItem("access_token")
    };
    this.adminService.fetchAddress(postData).subscribe(data => {
      if(data["result"].length>0){
        // this.addresses_pincode=data["result"][0].pin_code;
              this.otpForm.get("delivery_postcode").setValue(data["result"][0].pin_code);

         // this.estimate_time_delivery();
      }
    
    });
  }
estimate_time_delivery(){

 this.load++;
  //this.estimate_count=!this.estimate_count;
 
    if(this.otpForm.controls.delivery_postcode.value==''){
 let msg="Please enter pincode.";
       this.snackbar.open(msg, "", {
        duration: 3000
      });
    }
    if(this.estimate_self==false){
      if(this.userC==true){
          if(this.c.length>0){
            for (let i = 0; i < this.c.length; i++) {
        
             this.otpForm.get("weight").setValue(this.c[i].product.final_weight);
             
            
            }
          }
      }
     

    
      else{
          if(this.products.length>0){
            for (let i = 0; i < this.products.length; i++) {
               this.otpForm.get("weight").setValue(this.products[i].final_weight);
            
            }
          }
      }
     
     
    }
  this.adminService.estimate_time_delivery(this.otpForm.value).subscribe(data => {
    if(data['status']==1){
      this.etd=data['etd'];
      if(this.userC==true){
        if(this.c.length>0){
            for (let i = 0; i < this.c.length; i++) {
              this.c[i].etd=this.etd;
            
            }
     
        }
      }
      else{
          if(this.products.length>0){
            for (let i = 0; i < this.products.length; i++) {
              this.products[i].etd=this.etd;
            
            }
          }
      }
     
      
    }
    if(data['status']==0){
      let msg="Courier service not available.";
      this.snackbar.open(msg, "", {
        duration: 3000
      });
    }
     
    });


}
estim(){
  this.estimate_count=1;
}

  // end for 24/08/2020
//start for qty update without login

updateCart3minusl(qty2,qty_stock,product_no) {
    // var qty = 1;
    this.isLoggedIn = true;
    var qty=parseInt(qty2)-1;
    if (qty < 1) {
      this.snackbar.open("Choose Valid quantity.", "", {
        duration: 3000
      });
      this.ngOnInit();
    }
      else if (qty >= 1) {
        // start 
if(this.cookie.get("product_id2") != null && this.cookie.get("product_id2") != ''){
        var getCookie=this.cookie.get("product_id2");
         var strings = getCookie.replace('%2C',',');

         var getCookieQ=this.cookie.get("quantity");
         var stringsQ = getCookieQ.replace('%2C',',');
         var strings2=strings.split(",");
         var strings2Q=stringsQ.split(",");
         for(let gg=0;gg<strings2.length;gg++){
              strings2[gg] = strings2[gg].replace(/^\s*/, "").replace(/\s*$/, "");

 strings2Q[gg] = strings2Q[gg].replace(/^\s*/, "").replace(/\s*$/, "");
              if(strings2[gg] == product_no){
                   //console.log(strings2Q[gg]);
                 strings2Q[gg]= (qty).toString();
                   //console.log(strings2Q[gg]);
                   //console.log(strings2[gg]);

                    // quants.concat(","+this.qty_set);
        
              }
         }
      }
       // if(this.alreadyCart == true){
         //console.log(strings2);
      //console.log(strings2Q);
      var k=null;
      for (var i = 0; i < strings2Q.length; i++) {
        //console.log(k);
        if(k==null){
           k=strings2Q[i];
       
        }
        else{
           k=k.concat(","+strings2Q[i]);
       
        }
       
      }
        //console.log(k);
      
        this.cookie.set('quantity',k);
        //console.log(this.cookie.get('quantity'));
         

      

        //start fetch product
          var quotes = this.cookie.get("product_id2");

        var d = quotes.replace(/%2C/g, ",");
        var d1 = d.split(",");

        var dn = quotes.replace(/,""/g, "");
        //start for qty
         var quotesQ = this.cookie.get("quantity");
        var dQ = quotesQ.replace(/%2C/g, ",");
        var d1Q = dQ.split(",");

        var dnQ = quotesQ.replace(/,""/g, "");
        //en for qty
        var postData2 = { product_no: "", comp_num: "" };
        postData2.product_no = dn;
        postData2['quantity']=dnQ;
        postData2.comp_num = sessionStorage.getItem("comp_num_new");
        //console.log(postData2);
        // end
     

      this.adminService.fethcProductWishlist(postData2).subscribe(data => {
        this.isLoggedOut = false;
        this.isLoggedIn = true;
        this.loader = false;
        if (data["status"] == "1") {
          this.loader = true;
          
          // this.updateCartCount();
            this.products = data["wishlist"];
            this.total_mrp=data["total_mrp"];
            this.total_discount=data["total_discount"];
            this.total_entity=data['total_entity'];
            this.total_shipp=data["total_shipping"];
            this.total_nett=data["total_net"];
             this.net_amount =this.total_nett-this.total_shipp;

           this.snackbar.open("Update Cart Successfully", "", {
            duration: 3000
          });this.ngOnInit();
          if(this.previewFlag == '1'){
            if ((sessionStorage.getItem("comp_num_new") == "0") && (this.host_name != "localhost:4209")) {
            }else{
              
            }
  
          }else{
           
          }
        } else if (data["status"] == "10") {
         
        } else {
          this.loader = true;
          this.snackbar.open("This cart is not update..!", "", {
            duration: 3000
          });
         
        }
        this.loader = true;
      });
    } else {
      this.loader = true;

      this.snackbar.open("This quantity is not available.", "", {
        duration: 3000
      });
      this.ngOnInit();
    }
  }
  updateCart3plusl(qty2,qty_stock,product_no) {
    // var qty = 1;
    // this.isLoggedIn = true;
    var qty=parseInt(qty2)+1;
    if (qty < 1) {
      this.snackbar.open("Choose Valid quantity.", "", {
        duration: 3000
      });
      this.ngOnInit();
    }
    else if(qty > parseInt(qty_stock)){
      let msg="Quantity limit exceed.";
      // let msg="only "+qty_stock+" quantity available.";
       this.snackbar.open(msg, "", {
        duration: 3000
      });
        this.ngOnInit();
    } else if (qty >= 1) {
      // start 
if(this.cookie.get("product_id2") != null && this.cookie.get("product_id2") != ''){
        var getCookie=this.cookie.get("product_id2");
         var strings = getCookie.replace('%2C',',');

         var getCookieQ=this.cookie.get("quantity");
         var stringsQ = getCookieQ.replace('%2C',',');
         var strings2=strings.split(",");
         var strings2Q=stringsQ.split(",");
         for(let gg=0;gg<strings2.length;gg++){
              strings2[gg] = strings2[gg].replace(/^\s*/, "").replace(/\s*$/, "");

 strings2Q[gg] = strings2Q[gg].replace(/^\s*/, "").replace(/\s*$/, "");
              if(strings2[gg] == product_no){
                   //console.log(strings2Q[gg]);
                 strings2Q[gg]= (qty).toString();
                   //console.log(strings2Q[gg]);
                   //console.log(strings2[gg]);

                    // quants.concat(","+this.qty_set);
        
              }
         }
      }
       // if(this.alreadyCart == true){
         //console.log(strings2);
      //console.log(strings2Q);
      var k=null;
      for (var i = 0; i < strings2Q.length; i++) {
        //console.log(k);
        if(k==null){
           k=strings2Q[i];
       
        }
        else{
           k=k.concat(","+strings2Q[i]);
       
        }
       
      }
        //console.log(k);
      
        this.cookie.set('quantity',k);
        //console.log(this.cookie.get('quantity'));
         

      

        //start fetch product
          var quotes = this.cookie.get("product_id2");

        var d = quotes.replace(/%2C/g, ",");
        var d1 = d.split(",");

        var dn = quotes.replace(/,""/g, "");
        //start for qty
         var quotesQ = this.cookie.get("quantity");
        var dQ = quotesQ.replace(/%2C/g, ",");
        var d1Q = dQ.split(",");

        var dnQ = quotesQ.replace(/,""/g, "");
        //en for qty
        var postData2 = { product_no: "", comp_num: "" };
        postData2.product_no = dn;
        postData2['quantity']=dnQ;
        postData2.comp_num = sessionStorage.getItem("comp_num_new");
        //console.log(postData2);
        // end

      this.adminService.fethcProductWishlist(postData2).subscribe(data => {
        // this.isLoggedOut = false;
        // this.isLoggedIn = true;
        this.loader = false;
        if (data["status"] == "1") {
          this.loader = true;
         
            this.products = data["wishlist"];
            this.total_mrp=data["total_mrp"];
            this.total_discount=data["total_discount"];

            this.total_shipp=data["total_shipping"];
            this.total_nett=data["total_net"];
             this.net_amount =this.total_nett-this.total_shipp;

            this.snackbar.open("Update Cart Successfully", "", {
            duration: 3000
          });
            this.ngOnInit();
          if(this.previewFlag == '1'){
            if ((sessionStorage.getItem("comp_num_new") == "0") && (this.host_name != "localhost:4209")) {
            }else{
             
            }
    
  
          }else{
           
          }
        } else if (data["status"] == "10") {
          
        } else {
          this.loader = true;
          this.snackbar.open("This cart is not update..!", "", {
            duration: 3000
          });
          
        }
        this.loader = true;
      });
    } else {
      this.loader = true;

      this.snackbar.open("This quantity is not available.", "", {
        duration: 3000
      });
      this.ngOnInit();
    }
  }

 updateCart3l(qty2,qty_stock,qty,product_no) {
    // var qty = 1;
    // this.isLoggedIn = true;

    if (qty < 1) {
      this.snackbar.open("Choose Valid quantity.", "", {
        duration: 3000
      });
      this.ngOnInit();
    }
    else if(qty > parseInt(qty_stock)){
      let msg="Quantity limit exceed.";
      // let msg="only "+qty_stock+" quantity available.";
       this.snackbar.open(msg, "", {
        duration: 3000
      });
        this.ngOnInit();
    }
     else if (qty >= 1) {
       // start 
if(this.cookie.get("product_id2") != null && this.cookie.get("product_id2") != ''){
        var getCookie=this.cookie.get("product_id2");
         var strings = getCookie.replace('%2C',',');

         var getCookieQ=this.cookie.get("quantity");
         var stringsQ = getCookieQ.replace('%2C',',');
         var strings2=strings.split(",");
         var strings2Q=stringsQ.split(",");
         for(let gg=0;gg<strings2.length;gg++){
              strings2[gg] = strings2[gg].replace(/^\s*/, "").replace(/\s*$/, "");

 strings2Q[gg] = strings2Q[gg].replace(/^\s*/, "").replace(/\s*$/, "");
              if(strings2[gg] == product_no){
                   //console.log(strings2Q[gg]);
                 strings2Q[gg]= (qty).toString();
                   //console.log(strings2Q[gg]);
                   //console.log(strings2[gg]);

                    // quants.concat(","+this.qty_set);
        
              }
         }
      }
       // if(this.alreadyCart == true){
         //console.log(strings2);
      //console.log(strings2Q);
      var k=null;
      for (var i = 0; i < strings2Q.length; i++) {
        //console.log(k);
        if(k==null){
           k=strings2Q[i];
       
        }
        else{
           k=k.concat(","+strings2Q[i]);
       
        }
       
      }
        //console.log(k);
      
        this.cookie.set('quantity',k);
        //console.log(this.cookie.get('quantity'));
         

      

        //start fetch product
          var quotes = this.cookie.get("product_id2");

        var d = quotes.replace(/%2C/g, ",");
        var d1 = d.split(",");

        var dn = quotes.replace(/,""/g, "");
        //start for qty
         var quotesQ = this.cookie.get("quantity");
        var dQ = quotesQ.replace(/%2C/g, ",");
        var d1Q = dQ.split(",");

        var dnQ = quotesQ.replace(/,""/g, "");
        //en for qty
        var postData2 = { product_no: "", comp_num: "" };
        postData2.product_no = dn;
        postData2['quantity']=dnQ;
        postData2.comp_num = sessionStorage.getItem("comp_num_new");
        //console.log(postData2);
        // end
      this.adminService.fethcProductWishlist(postData2).subscribe(data => {
        // this.isLoggedOut = false;
        // this.isLoggedIn = true;
        this.loader = false;
        if (data["status"] == "1") {
          this.loader = true;
          
          // this.updateCartCount();
            this.products = data["wishlist"];
            this.total_mrp=data["total_mrp"];
            this.total_discount=data["total_discount"];

            this.total_shipp=data["total_shipping"];
            this.total_nett=data["total_net"];
             this.net_amount =this.total_nett-this.total_shipp;

           this.snackbar.open("Update Cart Successfully", "", {
            duration: 3000
          });
           this.ngOnInit();
          if(this.previewFlag == '1'){
             if ((sessionStorage.getItem("comp_num_new") == "0") && (this.host_name != "localhost:4209")) {
             }else{
            
              }
  
          }else{
            
          }
        } else if (data["status"] == "10") {
          this.router
            .navigateByUrl("/RefreshComponent", {
              skipLocationChange: true
            })
            .then(() => this.router.navigate(["/expired"]));
        } else {
          this.loader = true;
          this.snackbar.open("This cart is not update..!", "", {
            duration: 3000
          });
          if (sessionStorage.getItem("access_token") == "") {
            this.router
              .navigateByUrl("/RefreshComponent", {
                skipLocationChange: true
              })
              .then(() => this.router.navigate(["/expired"]));
          }
        }
        this.loader = true;
      });
    } else {
      this.loader = true;

      this.snackbar.open("This quantity is not available.", "", {
        duration: 3000
      });
      this.ngOnInit();
    }
  }

//end for qty update without login
deleteFromCartWithoutLogin(product_no){
  console.log(product_no);
 var res = confirm("Are you sure you want to delete this product from cart.");
    if (res) { if(this.cookie.get("product_id2") != null && this.cookie.get("product_id2") != ''){
        var getCookie=this.cookie.get("product_id2");//product cookie string
         var strings = getCookie.replace('%2C',',');//product cookie string ,,

         var getCookieQ=this.cookie.get("quantity");  //quantity cookie string
         var stringsQ = getCookieQ.replace('%2C',','); //quantity cookie string ,,
         // let stringToSplit = "abc def ghi";
         var strings2=strings.split(",");//product cookie string split

         var strings2Q=stringsQ.split(",");//product cookie string split

         for(let gg=0;gg<strings2.length;gg++){//product loop
              strings2[gg] = strings2[gg].replace(/^\s*/, "").replace(/\s*$/, "");
// myStringWithCommas.split(/\s*,\s*/).forEach(function(myString) {
// });
 strings2Q[gg] = strings2Q[gg].replace(/^\s*/, "").replace(/\s*$/, "");
 
              if(strings2[gg] == product_no){
                   
    strings2.splice(gg, 1);
    strings2Q.splice(gg, 1);
                   // strings2Q[gg] =null ;
              
              }
         }
      }
         console.log(strings2);
      console.log(strings2Q);
      
      var k=null;
      var k2=null;
      for (var i = 0; i < strings2Q.length; i++) {
        //console.log(k);
        if(k==null){
           k=strings2Q[i];
       
        }
        else{
           k=k.concat(","+strings2Q[i]);
       
        }

        if(k2==null){
           k2=strings2[i];
       
        }
        else{
           k2=k2.concat(","+strings2[i]);
       
        }
       
      }
        console.log(k);
        console.log(k2);
      
        this.cookie.set('quantity',k);
        this.cookie.set('product_id2',k2);
        
       

        //start fetch product
          var quotes = this.cookie.get("product_id2");

        var d = quotes.replace(/%2C/g, ",");
        var d1 = d.split(",");

        var dn = quotes.replace(/,""/g, "");
        //start for qty
         var quotesQ = this.cookie.get("quantity");
        var dQ = quotesQ.replace(/%2C/g, ",");
        var d1Q = dQ.split(",");

        var dnQ = quotesQ.replace(/,""/g, "");
        //en for qty
        var postData2 = { product_no: "", comp_num: "" };
        postData2.product_no = dn;
        postData2['quantity']=dnQ;
        postData2.comp_num = sessionStorage.getItem("comp_num_new");
        console.log(postData2);

 this.loader = true;
   this.snackbar.open("This product is delete from cart Successfully.", "", {
        duration: 3000
      });
        // window.location.reload();
        if(this.previewFlag == '1'){
           if ((sessionStorage.getItem("comp_num_new") == "0") && (this.host_name != "localhost:4209")) {
          // if ((sessionStorage.getItem("comp_num_new") == "0") && (this.host_name != "www.ecomtrails.com")) {
            this.router
            .navigateByUrl("/RefreshComponent", {
              skipLocationChange: true
            })
            .then(() => this.router.navigate(["/Admin/preview/my-cart"]));
          }else{
            this.router
            .navigateByUrl("/RefreshComponent", {
              skipLocationChange: true
            })
            .then(() => this.router.navigate(["/my-cart"]));

          }

        }else{
          this.router
          .navigateByUrl("/RefreshComponent", {
            skipLocationChange: true
          })
          .then(() => this.router.navigate(["/my-cart"]));

        }
        
    } 

}
}

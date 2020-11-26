import { Component, OnInit, HostListener, ElementRef } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
 import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { first } from "rxjs/operators";
import { RoarclubserviceService } from "../roarclubservice.service";
import {MatSnackBar} from  '@angular/material/snack-bar'
 import { CookieService } from "ngx-cookie-service";
import { Location } from "@angular/common";
// import { SwiperOptions } from "swiper";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  isShow: boolean;
  qty_set;
  qty;
  brands;
  rating_option=true;
  alreadyCart=false;
  alreadyCartStock=false;
  public WishListisshow =false;
  topCategories;
  public sellingDiscount=false;
  categories;
  notbuy=true;
  categories2 = [];
  more = false;
  topPosToStartShowing = 100;
  megaMenu = false;
  banner = false;
  shipping='0';
  rentShow  = false;
  offsetNew=1;
  page_itemsNew=4;
  pagesNew=1;
  ratebuy;
  banner_group_a=0;
  banner_group_b=0;
  banner_group_c=0;
   banner_group_d=0;
  banner_group_e=0;

  banner_group_linkd=0;
  banner_group_linke=0;

  banner_group_linka=0;
  banner_group_linkb=0;
  banner_group_linkc=0;

   offsetSelling=1;
   pagesSelling=1;
  page_itemsSelling=4;

   offsetRent=1;
  page_itemsRent=4;
  pagesRent=1;

   offsetDisc=1;
  page_itemsDisc=4;
  pagesDisc=1;


  public access_token = sessionStorage.getItem("access_token");
  public user_num = sessionStorage.getItem("user_num");
  newproduct;
  topSelling;
  registerForm2: FormGroup;
  discountS;
  comp_num_new = sessionStorage.getItem("comp_num_new");
  specificCart2 = [];
  discountR;
  flag = localStorage.getItem("flag");
  flag1 = localStorage.getItem("flag1");
  userC = false;
  closeResult: string;
  previewFlag = sessionStorage.getItem('previewFlag');
  constructor(
    private adminservice: RoarclubserviceService,
    private router: Router,
    public snackbar: MatSnackBar,

    public location: Location,
  private cookie: CookieService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,

  ) {}
  product(){
    this.router.navigate(['/product-view'])
  }
  
  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  openXl(content) {
    this.modalService.open(content, { size: "xs" });
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
  host_name;
  host_link;
  bannerdata;
  preview = false;
  nopreview = false;
  ecomtrails = false;
  ninetoys = false;
  roarclubbannerdata;
  roarclub = false;
  mlm = false;
  serverlink;
  ngOnInit() {

    this.adminservice.ninetoysBanner({access_token:this.access_token,user_num:this.user_num,comp_num:this.comp_num_new}).subscribe(data=>{
      if(data['status']==1){ 
        this.roarclubbannerdata = data['result']; 
      
        }  
           
        
  		
      // else if(data['status']==0){
      // sessionStorage.clear();
      //  this.snackbar.open('Slider Is Not Fetch. ','' ,{
      //           duration: 3000,
      //           horizontalPosition:'center',
      //   });      
     
      // }
      else{

      }
  	},
  	error=>{
  		
    	}
    );
    // let l = location.origin;
    // var c = l.split("//");
    // this.host_name = c[1];
    // let serv = this.host_name;
    // var s = serv.split(".");
    // this.serverlink = s[1];
     this.adminservice
          .get_host_link({
          comp_num : 0
          })
          .subscribe(datan => {
            if(datan['status']==1){
              var h= JSON.parse(datan['result']['value']);
               this.serverlink=h['host_link'];
            }

        })
     if(this.serverlink == 'ecomtrails'){
        this.ecomtrails = true;
      }else if(this.serverlink == '9toys'){
        this.ninetoys = true;
      }else{
        this.ecomtrails = true;

      }
    if(this.ecomtrails == true){
    this.adminservice
    .fetchBrandsEcom({//for ecom
     // .fetchBrands({
        // access_token: this.access_token,user_num: this.user_num
        comp_num : this.comp_num_new
      })
      .subscribe(
        data => {
          if (data["status"] == 1) {
            this.brands = data['result'];

          } else if (data["status"] == 10) {
            
          } else {
          }
        },
        error => {
          // this.loading = false;
        }
      );
    }
    else{
       this.adminservice
    // .FetchBrandEcom({//for ecom
     .fetchBrands({
        // access_token: this.access_token,user_num: this.user_num
        comp_num : 0
      })
      .subscribe(
        data => {
          if (data["status"] == 1) {
            this.brands = data['result'];

          } else if (data["status"] == 10) {
            
          } else {
          }
        },
        error => {
          // this.loading = false;
        }
      );
    }
    this.compSettings_ratingOption();


    
    if (
      sessionStorage.getItem("user_num") &&
      sessionStorage.getItem("user_num") != null && sessionStorage.getItem("user_num") != ''
    ) {
      
      this.userC = true;
    }
    this.registerForm2 = this.formBuilder.group({
      rate_type: [""],
      product_no: [""],
      user_num: sessionStorage.getItem("user_num"),
      access_token: sessionStorage.getItem("access_token")
    });

    if (this.flag == "1") {
      localStorage.clear();
      window.location.reload();
    }
    if (this.flag1 == "0") {
      localStorage.clear();
      window.location.reload();
    }

    ///cart related/////
    // if (
    //   (sessionStorage.getItem("user_num") != "" &&
    //     sessionStorage.getItem("access_token") != "") ||
    //   (sessionStorage.getItem("user_num") != null &&
    //     sessionStorage.getItem("access_token") != null)
    // ) {
    //   if (
    //     this.cookie.get("product_id2") !== null ||
    //     this.cookie.get("product_id2") !== ""
    //   ) {
    //     var quotes = this.cookie.get("product_id2");

    //     var d = quotes.replace(/%2C/g, ",");
    //     var d1 = d.split(",");

    //     var dn = quotes.replace(/,""/g, "");

    //     var postData = {
    //       product_no: "",
    //       access_token: "",
    //       user_num: "",
    //       rate_type: ""
    //     };
    //     postData.product_no = dn;
    //     postData.access_token = sessionStorage.getItem("access_token");
    //     postData.user_num = sessionStorage.getItem("user_num");
    //     postData.rate_type = "1";
    //   }
     // start for add to cart without login
     if (
      (sessionStorage.getItem("user_num") != "" &&
        sessionStorage.getItem("access_token") != "") &&
      (sessionStorage.getItem("user_num") != null &&
        sessionStorage.getItem("access_token") != null)
    ) {
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

        this.adminservice.addToCartWL(postData).subscribe(data => {
          if (data["status"] == "1") {


            // cart cunt start
            this.adminservice.fetch_cart_count(postData).subscribe(data => {
              if (data["status"] == "1") {
                this.count = data['cart_count'];
                this.adminservice.cartCount.next(this.count);
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
            

            // this.adminservice.updateCartCount();
          }
        });
      }
    }
     //end for add to cart without login
      

      // ==========for withouht login, wishlist=========================
    //} 
    else if (
      (sessionStorage.getItem("user_num") === "" &&
        sessionStorage.getItem("access_token") === "") ||
      (sessionStorage.getItem("user_num") === null &&
        sessionStorage.getItem("access_token") === null)
    ) {
    }
   
    let l = location.origin;
    var c = l.split("//");
    this.host_name = c[1];
    let serv = this.host_name;
    var s = serv.split(".");
    this.serverlink = s[1];

        
    if( (this.host_name == "vendor.ecomtrails.com"  && sessionStorage.getItem('previewFlag') == '1' ) || (this.host_name == "signup.ecomtrails.com"  && sessionStorage.getItem('previewFlag') == '1' ) || (this.host_name == "vendor.9toyz.com"  && sessionStorage.getItem('previewFlag') == '1' ) || (this.host_name == "http://localhost:4200"  && sessionStorage.getItem('previewFlag') == '1' )  ){
          this.ecomtrails = true;
          this.ninetoys = false;
          this.comp_num_new = sessionStorage.getItem('comp_num_new');
          this.fetch_categories(this.comp_num_new);
          this.compSettings(this.comp_num_new);
          this.newProduct(this.comp_num_new);
          // this.allCategoryProductCount(this.comp_num_new);
          this.bannerImage(this.comp_num_new);
          this.topSellingProducts(this.comp_num_new);
          this.topDiscountProducts(this.comp_num_new);
          this.topDiscountProductsRent(this.comp_num_new);
          this.preview= true;
      }

      else if((this.host_name == "vendor.9toys.in"  && sessionStorage.getItem('previewFlag') == '1') || (this.host_name == "signup.9toys.in"  && sessionStorage.getItem('previewFlag') == '1')){
        this.ecomtrails = false;
        this.ninetoys = true;
        this.comp_num_new = sessionStorage.getItem('comp_num_new');
        this.fetch_categories(this.comp_num_new);
        this.compSettings(this.comp_num_new);
        this.newProduct(this.comp_num_new);
        // this.allCategoryProductCount(this.comp_num_new);
        this.bannerImage(this.comp_num_new);
        this.topSellingProducts(this.comp_num_new);
        this.topDiscountProducts(this.comp_num_new);
        this.topDiscountProductsRent(this.comp_num_new);
        this.preview= true;
      }
      // start for mlm and roarclub
else if((this.host_name == "associate.909corns.in"  && sessionStorage.getItem('previewFlag') == '1') || (this.host_name == "signup.909corns.in"  && sessionStorage.getItem('previewFlag') == '1')){
        this.ecomtrails = true;
        this.mlm = true;
         sessionStorage.setItem("comp_num_new",'0');
         this.comp_num_new ='0';
        this.comp_num_new = sessionStorage.getItem('comp_num_new');
        this.fetch_categories(this.comp_num_new);
        this.compSettings(this.comp_num_new);
        this.newProduct(this.comp_num_new);
        // this.allCategoryProductCount(this.comp_num_new);
        this.bannerImage(this.comp_num_new);
        this.topSellingProducts(this.comp_num_new);
        this.topDiscountProducts(this.comp_num_new);
        this.topDiscountProductsRent(this.comp_num_new);
        this.preview= true;
      }else if((this.host_name == "vendor.roarclub.in"  && sessionStorage.getItem('previewFlag') == '1') || (this.host_name == "signup.roarclub.in"  && sessionStorage.getItem('previewFlag') == '1')){
        this.ecomtrails = true;
        this.roarclub = true;
         sessionStorage.setItem("comp_num_new",'0');
         this.comp_num_new ='0';
        this.comp_num_new = sessionStorage.getItem('comp_num_new');
        this.fetch_categories(this.comp_num_new);
        this.compSettings(this.comp_num_new);
        this.newProduct(this.comp_num_new);
        // this.allCategoryProductCount(this.comp_num_new);
        this.bannerImage(this.comp_num_new);
        this.topSellingProducts(this.comp_num_new);
        this.topDiscountProducts(this.comp_num_new);
        this.topDiscountProductsRent(this.comp_num_new);
        this.preview= true;
      }
      // end for mlm and roarclub
      else{
        this.adminservice
        .hostlink({ host_name: this.host_name })
        .subscribe(data => {
          if (data["status"] == 1) {
            if (data["result"].comp_num == "01") {
            
                this.router.navigate(["/Admin"]);
             
            } else {
              if (data["result"].is_active == "Y") {
                if(this.serverlink == 'ecomtrails'){
                  this.ecomtrails = true;
                }else if(this.serverlink == '9toys'){
                  this.ninetoys = true;
                }else{
                  this.ecomtrails = true;
                  // this.ninetoys = true;

                }
                this.nopreview = true;
                if (this.host_name == data["result"].host_name) {
                  sessionStorage.setItem(
                    "comp_num_new",
                    data["result"].comp_num
                  );
                  this.comp_num_new = data["result"].comp_num;
                  this.fetch_categories(this.comp_num_new);
                  this.compSettings(this.comp_num_new);
                  this.newProduct(this.comp_num_new);
                  // this.allCategoryProductCount(this.comp_num_new);
                  this.bannerImage(this.comp_num_new);
                  this.topSellingProducts(this.comp_num_new);
                  this.topDiscountProducts(this.comp_num_new);
                  this.topDiscountProductsRent(this.comp_num_new);
                } else {
                  this.router.navigate(["/404-page-not-found"]);
                }
                // condition for is active
              } else {
                this.router.navigate(["/page-not-working"]);
                //consiiton for is active
              }
            }
          } else {
            sessionStorage.setItem("not-found", "1");
            this.router.navigate(["404-page-not-found"]);
          }
        });

      }
      
    

    /////************end */
  }

  getImage(image): string {
    return this.adminservice.getImage(image);
  }
  getThumbnail1(thumbnail1): string {
    return this.adminservice.getThumbnail1(thumbnail1);
  }
  getThumbnail2(thumbnail2): string {
    return this.adminservice.getThumbnail2(thumbnail2);
  }

  getGalleryImage(image): string {
    return this.adminservice.getGalleryImage(image);
  }
  getGalleryThumbnail1(thumbnail1): string {
    return this.adminservice.getGalleryThumbnail1(thumbnail1);
  }
  getGalleryThumbnail2(thumbnail2): string {
    return this.adminservice.getGalleryThumbnail2(thumbnail2);
  }

  rates(product) {
    // if (
    //   this.registerForm2.controls.user_num.value == null ||
    //   this.registerForm2.controls.access_token.value == null ||
    //   this.registerForm2.controls.user_num.value == "" ||
    //   this.registerForm2.controls.access_token.value == ""
    // ) {
    //   this.modalService.dismissAll("Save click");
    //   this.snackbar.open("Please Login First", "", {
    //     duration: 1000
    //   });
    // } else {
      this.registerForm2.get("product_no").setValue(product.product_no);
      if (
          product.rate[0].rate_type != "2" &&
          product.rate[0].rate_type != 2
        ) {
        this.ratebuy=product.rate[0].rate_type;
       this.registerForm2.get("rate_type").setValue(product.rate[0].rate_type);
      }
      else if( product.rate[1].rate_type != "2" &&
          product.rate[1].rate_type != 2){
         this.ratebuy=product.rate[1].rate_type;
       this.registerForm2.get("rate_type").setValue(product.rate[1].rate_type);
     
      }
      for (let k = 0; k < product.rate.length; k++) {
       
        if (
          product.rate[k].rate_type == "2" ||
          product.rate[k].rate_type == 2
        ) {
          this.shipping=product.rate[k].rate;
         this.ratebuy=this.ratebuy+ this.shipping;
       // this.registerForm2.get("rate_type").setValue(this.ratebuy);
     
         
        }
      }
    // }
//start for buy now modify
       var postData = {
      product_no: "",
      access_token: "",
      comp_num:sessionStorage.getItem("comp_num_new"),
      user_num: "",
      rate_type: this.registerForm2.controls.rate_type.value
    };

    postData.product_no = this.registerForm2.controls.product_no.value;
    // postData.rate_type = rate_type;
    postData.access_token = sessionStorage.getItem("access_token");
    postData.user_num = sessionStorage.getItem("user_num");

    // let send=this.registerForm2.value;
    // if (
    //   postData.user_num == null ||
    //   postData.access_token == null ||
    //   postData.user_num == "" ||
    //   postData.access_token == ""
    // ) {
    //   alert("Please login first");
    // } else {
      this.adminservice.buy = true;
      sessionStorage.setItem("product_no2", postData.product_no);
      sessionStorage.setItem("rate_buy", postData.rate_type);
      let id_object = { product_no: postData.product_no };
     if (
      this.registerForm2.controls.user_num.value == null ||
      this.registerForm2.controls.access_token.value == null ||
      this.registerForm2.controls.user_num.value == "" ||
      this.registerForm2.controls.access_token.value == ""
    ) {
 this.cookie.set('buy_now_product',"true");
        // sessionStorage.setItem("buy_now_product", "true");

           this.snackbar.open("Please Login First", "", {
        duration: 1000
      });
                this.router.navigate(["/login"]);


       }
     else{
         if(this.previewFlag == '1'){
          this.router.navigate(["/Admin/preview/checkout"]);
        }else{
          this.router.navigate(["/checkout"]);

        }
     }
      // this.adminservice.sendProductId(id_object);
      
      
    // }
    //end for buy now modify
  }
  buyNow() {
    var postData = {
      product_no: "",
      access_token: "",
      comp_num:sessionStorage.getItem("comp_num_new"),
      user_num: "",
      rate_type: this.registerForm2.controls.rate_type.value
    };

    postData.product_no = this.registerForm2.controls.product_no.value;
    // postData.rate_type = rate_type;
    postData.access_token = sessionStorage.getItem("access_token");
    postData.user_num = sessionStorage.getItem("user_num");

    // let send=this.registerForm2.value;
    if (
      postData.user_num == null ||
      postData.access_token == null ||
      postData.user_num == "" ||
      postData.access_token == ""
    ) {
      alert("Please login first");
    } else {
      this.adminservice.buy = true;
      sessionStorage.setItem("product_no2", postData.product_no);
      sessionStorage.setItem("rate_buy", postData.rate_type);
      let id_object = { product_no: postData.product_no };
      // this.adminservice.sendProductId(id_object);
      // this.router.navigate(["/checkout"]);
      if(this.previewFlag == '1'){
        this.router.navigate(["/Admin/preview/checkout"]);
      }else{
        this.router.navigate(["/checkout"]);

      }
    }
  }
count=0;
  addToCart(product) {
    // location.reload()
    var detail = product;
    var postData = {
      product_no: "",
      access_token: "",
      user_num: "",
       comp_num:sessionStorage.getItem("comp_num_new"),
      rate_type: "",
      qty: 1
    };
    postData.product_no = product.product_no;
    if (product.rate[0].is_rent != "2") {
      postData.rate_type = product.rate[0].rate_type;
    } else {
      postData.rate_type = product.rate[1].rate_type;
    }

    // postData.rate_type=product.rate[0].rate_type;
    postData.access_token = sessionStorage.getItem("access_token");
    postData.user_num = sessionStorage.getItem("user_num");

    if (
      (sessionStorage.getItem("user_num") == "" &&
        sessionStorage.getItem("access_token") == "") ||
      (sessionStorage.getItem("user_num") == null &&
        sessionStorage.getItem("access_token") == null)
    ) {
      this.count = this.count+1;
console.log(this.count);
       this.alreadyCart=false;
     this.alreadyCartStock=false;
      if(this.cookie.get("product_id2") != null && this.cookie.get("product_id2") != ''){
        var getCookie=this.cookie.get("product_id2");
         var strings = getCookie.replace('%2C',',');

         var getCookieQ=this.cookie.get("quantity");
         var stringsQ = getCookieQ.replace('%2C',',');
         // let stringToSplit = "abc def ghi";
         var strings2=strings.split(",");
         var strings2Q=stringsQ.split(",");
               this.count=strings2.length;

         for(let gg=0;gg<strings2.length;gg++){
              strings2[gg] = strings2[gg].replace(/^\s*/, "").replace(/\s*$/, "");
// myStringWithCommas.split(/\s*,\s*/).forEach(function(myString) {
// });
 strings2Q[gg] = strings2Q[gg].replace(/^\s*/, "").replace(/\s*$/, "");

 console.log(this.count);
              if(strings2[gg] == product.product_no){
                   this.alreadyCart=true;
                   if(parseInt(strings2Q[gg])>=parseInt(product.txn_quantity)){
                     this.alreadyCartStock=true;
                   }
                   else{
                   //console.log(strings2Q[gg]);
                     strings2Q[gg]= (parseInt(strings2Q[gg])+1).toString();
                   }
                    // quants.concat(","+this.qty_set);
        
              }
         }
      }
       if(this.alreadyCart == true){
         //console.log(strings2);
      //console.log(strings2Q);
      if(this.alreadyCartStock==false){
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
         this.snackbar.open("This product already exist in cart,and quantity icreases by 1.", "", {
                duration: 5000
              });
          }
        else{
         this.snackbar.open("This product already exist in cart,and quantity reached the limit.", "", {
                duration: 5000
              });
        }
       
      }
      else{
      if (this.cookie.get("product_id2") == null || this.cookie.get("product_id2") == '') {
        var product_set = this.cookie.set("product_id2", product["product_no"]);
        this.qty_set=this.cookie.set("quantity", '1');
      } else if (this.cookie.get("product_id2") != null && this.cookie.get("product_id2") != '') {
        var newId = product["product_no"];
        var quants="1";

        if (this.cookie.get("product_id2")) {
          product = this.cookie.get("product_id2");
          this.qty_set=this.cookie.get("quantity");
        } else {
          product = [];
        }
        var co_qty;
        co_qty=quants.concat(","+this.qty_set);
         this.cookie.set("quantity",co_qty);
        var co;
        co = newId.concat("," + product);
        //rate_type topPosToStartShowing
        if (
          !this.cookie.get("rate_type") ||
          this.cookie.get("rate_type") == null || this.cookie.get("rate_type")==''
        ) {
          if (detail.rate[0].is_rent != "2") {
            var product_set = this.cookie.set(
              "rate_type",
              detail.rate[0].rate_type
            );
          } else {
            var product_set = this.cookie.set(
              "rate_type",
              detail.rate[1].rate_type
            );
          }
          // var product_set = this.cookie.set("rate_type", detail.rate[0].rate_type);
        } else if (this.cookie.get("rate_type") != null && this.cookie.get("rate_type") != '') {
          if (detail.rate[0].is_rent != "2") {
            var newIdR = detail.rate[0].rate_type;
          } else {
            var newIdR = detail.rate[1].rate_type;
          }
          // var newIdR = detail.rate[0].rate_type;
          var productR;
          if (this.cookie.get("rate_type")) {
            productR = this.cookie.get("rate_type");
          } else {
            productR = [];
          }
          var coR;
          coR = newIdR.concat("," + productR);

          this.cookie.set("rate_type", coR);

        }
        //rate_type end

        this.cookie.set("product_id2", co);

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
        // this.adminservice.updateCartCount();
        this.adminservice.fethcProductWishlist(postData2).subscribe(data => {
          if (data["status"] == "1") {
             this.count = data['wishlist'].length;
            // if (data["status"] == "1") {
            //   this.cart = data["wishlist"].length;
            // } else {
            //   this.cart = "0";
            // }
               // this.count+=this.count;
               console.log(this.count);

     this.adminservice.cartCount.next(this.count);
     this.snackbar.open("Added to Cart successfully", "", {
          duration: 1000
        });
   
             // this.adminservice.updateCartCount();
          }
        });
        //end fetch product
                    // this.adminservice.updateCartCount();
 // this.adminservice.updateCartCount();

        // location.reload();
        // this.snackbar.open("Added to Cart successfully", "", {
        //   duration: 1000
        // });
      }
    }
    } else {
      if (product.is_cart == "True") {
        this.snackbar.open("Already Exists in Cart", "", {
          duration: 1000
        });
      } else {
        this.adminservice.addCart(postData).subscribe(data => {
          if (data["status"] == "1") {
this.count = this.count+1;
            // cart cunt start
            this.adminservice.fetch_cart_count(postData).subscribe(data => {
              if (data["status"] == "1") {
                this.count = data['cart_count'];
                this.adminservice.cartCount.next(this.count);
              }
            });
            // cart count end
            // location.reload();
              
              // fetch_cart_count
     
   
                  // this.adminservice.updateCartCount();
                  this.ngOnInit();
            this.snackbar.open("Added to Cart", "", {
              duration: 1000
            });
            // this.adminservice.updateCartCount();
          } else if (data["status"] == "0") {
            this.snackbar.open("Already Exist in Cart", "", {
              duration: 1000
            });
          }
        });
      }
    }
  }
  addToWishlistWL(product) {
    var test= '<a routerLink="/login"> login </a>';
      this.snackbar.open("Please Login To Add product in Wishlist. ", 'Login', {
        duration: 5000
      }).onAction().subscribe(()=>this.router.navigateByUrl('/login'));
  }

  addToWishlist(product) {
    var postData = { product_no: "", access_token: "", user_num: "" ,comp_num:sessionStorage.getItem("comp_num_new")};
    postData.product_no = product.product_no;
    postData.access_token = sessionStorage.getItem("access_token");
    postData.user_num = sessionStorage.getItem("user_num");
    if (
      postData.user_num == null ||
      postData.access_token == null ||
      postData.user_num == "" ||
      postData.access_token == ""
    ) {
      this.snackbar.open("Please Login To Add product in Wishlist", "", {
        duration: 1000
      });
      if(this.previewFlag == '1'){
        this.router.navigate(["/Admin/preview/login"]);
      }else{
        this.router.navigate(["/login"]);

      }
      
      // if (this.cookie.get("product_id2W") == null) {
      //   var product_set = this.cookie.set("product_id2W", product["product_no"]);
      // } else if (this.cookie.get("product_id2W") != null) {
      //   var newId = product["product_no"];

      //   if (this.cookie.get("product_id2W")) {
      //     product = this.cookie.get("product_id2W");
      //   } else {
      //     product = [];
      //   }
      //   var co;
      //   co = newId.concat("," + product);

      //   this.cookie.set("product_id2W", co);
      //   this.snackbar.open("Added to Wishlist successfully", "", {
      //     duration: 1000
      //   });
      // }
    } else {
      if (product.is_wishlist == "True") {
        this.snackbar.open("Already Exists in Wishlist", "", {
          duration: 1000
        });
      } else {
        this.adminservice.addWishlist(postData).subscribe(data => {
          if (data["status"] == 1) {
            // alert('Added to Wishlist');
            this.snackbar.open("Added to Wishlist", "", {
              duration: 1000
            });
            this.ngOnInit();
          } else if (data["status"] == 0) {
            this.ngOnInit();
            this.WishListisshow = true;
            this.snackbar.open("Already Added", "", {
              duration: 1000
            });
          }
        });
      }
    }
  }

  getSlug(name: string, id): string {
     let re=" ";
     name.replace(re,"-");
    let slug = name.replace(/\s/, "-") + "-" + id + "&marketplace=ECOMTRAILS";
    return slug;
  }
  view_product(name, id,slug,quick) {
     let re=" ";
     if(quick=='N'){

     
     // name.replace(re,"-");
    // let slug = name.replace(/\s+/g, '-') + "-?product_no=" + id  + "&marketplace=ECOMTRAILS";
        if(this.previewFlag == '1'){
          // this.router
          // .navigateByUrl("/RefreshComponent", {
          //   skipLocationChange: true
          // })
          // .then(() => 
          this.router.navigate(["/Admin/preview/product-view", slug]);
        }else{
          // this.router
          // .navigateByUrl("/RefreshComponent", {
          //   skipLocationChange: true
          // })
          // .then(() => 
          this.router.navigate(["/product-view", slug]);

        }
    }

    // this.router
    //   .navigateByUrl("/RefreshComponent", {
    //     skipLocationChange: true
    //   })
    //   .then(() => this.router.navigate(["/product", slug]));
  }
  newProduct(dd) {
    this.adminservice
      .newProducts({
        access_token: this.access_token,
        user_num: this.user_num,
        comp_num: dd,
         offset: this.offsetNew,
         page_items:this.page_itemsNew
      })
      .subscribe(data => {
        if (data["status"] == 1) {
          this.newproduct = data["result"];
          this.pagesNew=data["pages"];
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
          // this.router.navigate(['/Admin/login']);
        } else if (data["status"] == 0) {
          // this.snackbar.open("Failed. ", "", {
          //   duration: 3000,
          //   horizontalPosition: "center"
          // });
        }
      });
  }
  topSellingProducts(dd) {
    this.adminservice
      .topSellingProducts({
        access_token: this.access_token,
        user_num: this.user_num,
        comp_num: dd,
         offset: this.offsetSelling,
         page_items:this.page_itemsSelling
      })
      .subscribe(data => {
        if (data["status"] == 1) {
          this.topSelling = data["result"];
          this.pagesSelling=data["pages"];
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
        } else if (data["status"] == 0) {
          // this.snackbar.open("Failed. ", "", {
          //   duration: 3000,
          //   horizontalPosition: "center"
          // });
        }
      });
  }
  topDiscountProducts(dd) {
    this.adminservice
      .topDiscountProducts({
        access_token: this.access_token,
        user_num: this.user_num,
        comp_num: dd,
         offset: this.offsetDisc,
         page_items:this.page_itemsDisc
      })
      .subscribe(data => {
        if (data["status"] == 1) {
          // this.discountR = data["result_rent"];
          this.discountS = data["result_sell"];
          this.pagesDisc=data["pages_sell"];
          if(this.discountS.length <= 0){
            
            this.sellingDiscount= false;
          }else{
            this.sellingDiscount= true;
            
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
          // this.router.navigate(['/Admin/login']);
        } else if (data["status"] == 0) {
          // this.snackbar.open("Failed. ", "", {
          //   duration: 3000,
          //   horizontalPosition: "center"
          // });
        }
      });
  }
   topDiscountProductsRent(dd) {
    this.adminservice
      .topDiscountProducts({
        access_token: this.access_token,
        user_num: this.user_num,
        comp_num: dd,
         offset: this.offsetRent,
         page_items:this.page_itemsRent
      })
      .subscribe(data => {
        if (data["status"] == 1) {
          this.discountR = data["result_rent"];
          this.pagesRent=data["pages_rent"];
          // this.discountS = data["result_sell"];
          // if(this.discountS.length <= 0){
            
          //   this.sellingDiscount= false;
          // }else{
          //   this.sellingDiscount= true;
            
          // }
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
          // this.router.navigate(['/Admin/login']);
        } else if (data["status"] == 0) {
          // this.snackbar.open("Failed. ", "", {
          //   duration: 3000,
          //   horizontalPosition: "center"
          // });
        }
      });
  }
  allCategoryProductCount(dd) {
    this.adminservice
      .allCategoryProductCount({
        access_token: this.access_token,
        user_num: this.user_num,
        comp_num: dd
      })
      .subscribe(data => {
        if (data["status"] == 1) {
          this.topCategories = data["result"];
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
          // this.router.navigate(['/Admin/login']);
        } else if (data["status"] == 0) {
        }
      });
  }
  fetch_categories(dd) {
     if(this.ninetoys==true || this.mlm==true || this.roarclub==true){
      dd="0";
    }
    this.adminservice
      .fetch_categories({
      // this.adminservice
      // .fetch_categories_ecom({//for ecom
        access_token: this.access_token,
        user_num: this.user_num,
        comp_num: dd
      })
      .subscribe(data => {
        if (data["status"] == 1) {
          this.categories = data["result"];
          let size = this.categories.length;
          if (size > 6) {
            for (let n = 0; n <= 6; n++) {
              this.more = true;
              this.categories2.push(this.categories[n]);
            }
            // this.categories2.push({more:this.categories});
          } else {
            for (let n2 = 0; n2 < this.categories.length; n2++) {
              this.categories2.push(this.categories[n2]);
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
          // this.router.navigate(['/Admin/login']);
        } else if (data["status"] == 0) {
        }
      });
  }
  
  bannerImage(dd) {
    this.adminservice
      .fetch_banner_image({
        comp_num: dd
      })
      .subscribe(data => {
        if (data["status"] == 1) {
          this.bannerdata = data["data"];
          if(this.bannerdata.value.banner_image_a_group){
            this.banner_group_a=1;
            if(this.bannerdata.value.banner_image_a_group_type=="link"){
              this.banner_group_linka=1;
            }

          }
          if(this.bannerdata.value.banner_image_b_group){
            this.banner_group_b=1;
            if(this.bannerdata.value.banner_image_b_group_type=="link"){
              this.banner_group_linkb=1;
            }
          }
          if(this.bannerdata.value.banner_image_c_group){
            this.banner_group_c=1;
            if(this.bannerdata.value.banner_image_c_group_type=="link"){
              this.banner_group_linkc=1;
            }
          }

           if(this.bannerdata.value.banner_image_d_group){
            this.banner_group_d=1;
            if(this.bannerdata.value.banner_image_d_group_type=="link"){
              this.banner_group_linkd=1;
            }
          }
           if(this.bannerdata.value.banner_image_e_group){
            this.banner_group_e=1;
            if(this.bannerdata.value.banner_image_e_group_type=="link"){
              this.banner_group_linke=1;
            }
          }
          this.banner = true;
        } else if (data["status"] == 0) {
          this.banner = false;
        }
      });
  }
 
 navigation(nav,type,id){
   
    if(type=="brand"){
       let slug =
nav.replace(/\s+/g, "-") +
      "-?brand_id=" +
      id +
      "&marketplace=ECOMTRAILS";
     
      if(this.previewFlag == '1'){
          // this.router
          // .navigateByUrl("/RefreshComponent", {
          //   skipLocationChange: true
          // })
          // .then(() =>
           this.router.navigate(["/Admin/preview/category-page/brand", slug]);
        }else{
          // this.router
          // .navigateByUrl("/RefreshComponent", {
          //   skipLocationChange: true
          // })
          // .then(() => 
          this.router.navigate(["/category-page/brand", slug]);

        }
      // this.router.navigate(["/shop", nav]);
    }
    else if(type=="category"){
       let slug = nav.replace(/\s+/g, '-') + "-?category_no=" + id  + "&marketplace=ECOMTRAILS";
      if(this.previewFlag == '1'){
          // this.router
          // .navigateByUrl("/RefreshComponent", {
          //   skipLocationChange: true
          // })
          // .then(() =>
           this.router.navigate(["/category-page", slug]);
        }else{
          // this.router
          // .navigateByUrl("/RefreshComponent", {
          //   skipLocationChange: true
          // })
          // .then(() => 
          this.router.navigate(["/category-page", slug]);

        }
      // this.router.navigate(["/shop", nav]);
    }
    else if(type=="product"){
       let slug = nav.replace(/\s+/g, '-') + "-?product_no=" + id  + "&marketplace=ECOMTRAILS";
      // name.replace(/\s+/g, "-")+"-?product_no="+id+"?marketplace=ECOMTRAILS
        if(this.previewFlag == '1'){
          // this.router
          // .navigateByUrl("/RefreshComponent", {
          //   skipLocationChange: true
          // })
          // .then(() =>
           this.router.navigate(["/Admin/preview/product-view", slug]);
        }else{
          // this.router
          // .navigateByUrl("/RefreshComponent", {
          //   skipLocationChange: true
          // })
          // .then(() =>
          
          this.router.navigate(["/product-view", slug]);

        }
    }
    else{
      // this.router
      //     .navigateByUrl("/RefreshComponent", {
      //       skipLocationChange: true
      //     })
      //     .then(() => 
          this.router.navigate([nav]);

        
    }
  }
  navigateBrand(name, id) {

    this.adminservice
      .fetch_product_list_check({
        comp_num: sessionStorage.getItem("comp_num"),
        brand_id: id
      })
      .subscribe(data => {
        if (data["status"] == 1) {
     let slug =
      name.replace(/\s+/g, "-") +
      "-?brand_id=" +
      id +
      "&marketplace=ECOMTRAILS";

    // let slug = name.replace(/\s/, "-") + "-?" + id;
    window.scroll(0, 0);
    if(this.previewFlag == '1'){
     this.router.navigate(["/Admin/preview/shop", "brand", slug]);
    }else{
       this.router.navigate(["/category-page", "brand", slug]);
    }
    
        }  else if (data["status"] == 0) {
           this.snackbar.open(
            "No Products Found. ",
            "",
            {
              duration: 3000,
              horizontalPosition: "center"
            }
          );
        }
      });
    
    // this.router.navigate(['/category', id]);
   
    this.megaMenu = false;
  }

  navigateCategory(name, id) {
     let re=" ";
     // name.replace(re,"-");
    let slug = name.replace(/\s+/g, '-') + "-?category_no=" + id  + "&marketplace=ECOMTRAILS";
    // this.router.navigate(['/category', id]);
    // let slug = name.replace(/\s/, "-") + "-?" + id;
    window.scroll(0, 0);
    // this.router
    //   .navigateByUrl("/RefreshComponent", {
    //     skipLocationChange: true
    //   })
    //   .then(() =>
       this.router.navigate(["/category-page", slug]);
    this.megaMenu = false;
  }

  compSettings(dd) {
     this.adminservice
      .fetch_particular_company_registry_with_sno({ comp_num: dd,s_no:7})
      .subscribe(data => {
     


        if (data["status"] == 1) {
           let d = data['data'];
           let v = d.value;
         if(v== '2'){
           this.notbuy=false;
         }
         if(v == '2' || v == '3'){
           this.rentShow = true;

         }else{
           this.rentShow = false;

         }
        } else {
          this.rentShow = false;
        }
            // }
         //  }
         // }
      });
    // this.adminservice
    //   .getparticularCompSetting({ comp_num: dd })
    //   .subscribe(data => {
    //     if (data["status"] == 1) {
    //     if(data['data'].length>6){
    //       let d = data['data'][6];

    //      let v = d.value;
    //      if(v== '2'){
    //        this.notbuy=false;
    //      }
    //      if(v == '2' || v == '3'){
    //        this.rentShow = true;

    //      }else{
    //        this.rentShow = false;

    //      }
    //     } else {
    //       this.rentShow = false;
    //     }
    //   }
    //   });
  }
 
   changeOffsetSell(offset) {
    if (offset <= 0) {
      this.offsetSelling = 1;
    } else {
      this.offsetSelling = offset;
      // document.documentElement.scrollTop = 0;
    }
    this.topSellingProducts(this.comp_num_new);

    // this.ngOnInit();
  }
 changeOffsetNew(offset) {
    if (offset <= 0) {
      this.offsetNew = 1;
    } else {
      this.offsetNew = offset;
      // document.documentElement.scrollTop = 0;
    }

    // this.ngOnInit();
       this.newProduct(this.comp_num_new);
                
               
  }
 changeOffsetDisc(offset) {
    if (offset <= 0) {
      this.offsetDisc = 1;
    } else {
      this.offsetDisc= offset;
      // document.documentElement.scrollTop = 0;
    }

    this.topDiscountProducts(this.comp_num_new);
  }
 changeOffsetRent(offset) {
    if (offset <= 0) {
      this.offsetRent = 1;
    } else {
      this.offsetRent = offset;
      // document.documentElement.scrollTop = 0;
    }

    this.topDiscountProductsRent(this.comp_num_new);
  }
   createRange2(number) {
    var items2: number[] = [];
    for (var i = 1; i <= number; i++) {
      items2.push(i);
    }
    return items2;
  }

// start 13/08/2020 Priyangee for update cart

 updateCart3(cart_id,cart_inventory_id,rate_type_actual,qty,qty_stock) {
    // var qty = 1;

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
      let data2 = { rate_type: rate_type_actual,
      qty: qty,
      cart_id: cart_id,
      cart_inventory_id: cart_inventory_id,
      user_num: sessionStorage.getItem("user_num"),
      comp_num: sessionStorage.getItem("comp_num_new"),
      access_token: sessionStorage.getItem("access_token")
    }
    

      this.adminservice.updateCart(data2).subscribe(data => {
       
        if (data["status"] == "1") {
         
           this.ngOnInit();
           this.snackbar.open("Update Cart Successfully", "", {
            duration: 3000
          });
          if(this.previewFlag == '1'){
             if ((sessionStorage.getItem("comp_num_new") == "0") && (this.host_name != "localhost:4209")) {
           }else{
               
              }
  
          }else{
           
          }
        }  else {
          this.snackbar.open("This cart is not update..!", "", {
            duration: 3000
          });
         
        }
      });
    } else {

      this.snackbar.open("This quantity is not available.", "", {
        duration: 3000
      });
      this.ngOnInit();
    }
  }

updateCart3minus(cart_id,cart_inventory_id,rate_type_actual,qty2,qty_stock) {
    // var qty = 1;
    var qty=parseInt(qty2)-1;
    if (qty < 1) {
      this.snackbar.open("Choose Valid quantity.", "", {
        duration: 3000
      });
      this.ngOnInit();
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

      this.adminservice.updateCart(data2).subscribe(data => {
       
        if (data["status"] == "1") {
          
           this.ngOnInit();
           this.snackbar.open("Update Cart Successfully", "", {
            duration: 3000
          });
          if(this.previewFlag == '1'){
            if ((sessionStorage.getItem("comp_num_new") == "0") && (this.host_name != "localhost:4209")) {
             }else{
             
            }
  
          }else{
           
          }
        }  else {
          this.snackbar.open("This cart is not update..!", "", {
            duration: 3000
          });
         
        }
      });
    } else {

      this.snackbar.open("This quantity is not available.", "", {
        duration: 3000
      });
      this.ngOnInit();
    }
  }
  updateCart3plus(cart_id,cart_inventory_id,rate_type_actual,qty2,qty_stock) {
    console.log(qty2);
    console.log(qty_stock);
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
      let data2 = { rate_type: rate_type_actual,
      qty: qty,
      cart_id: cart_id,
      cart_inventory_id: cart_inventory_id,
      user_num: sessionStorage.getItem("user_num"),
      comp_num: sessionStorage.getItem("comp_num_new"),
      access_token: sessionStorage.getItem("access_token")
    }

      this.adminservice.updateCart(data2).subscribe(data => {
        
        if (data["status"] == "1") {
         
           this.ngOnInit();
            this.snackbar.open("Update Cart Successfully", "", {
            duration: 3000
          });
          if(this.previewFlag == '1'){
            if ((sessionStorage.getItem("comp_num_new") == "0") && (this.host_name != "localhost:4209")) {
                  }else{
              
            }
    
  
          }else{
           
          }
        }  else {
          this.snackbar.open("This cart is not update..!", "", {
            duration: 3000
          });
          
        }
      });
    } else {

      this.snackbar.open("This quantity is not available.", "", {
        duration: 3000
      });
      this.ngOnInit();
    }
  }

    deleteFromCartF(id) {
    // var products = this.resultPro["product_no"];
    this.cookie.delete("product_id2");
    this.cookie.delete("rate_type");
     this.cookie.delete("quantity");
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
      
    this.adminservice.deleteCart(postData).subscribe(data => {
      if (data["status"] == "1") {
   this.ngOnInit();
      
        if(this.previewFlag == '1'){
           if ((sessionStorage.getItem("comp_num_new") == "0") && (this.host_name != "localhost:4209")) {
          
              }else{
            
          }

        }else{
          
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
             
            }


          }else{
            
          }
        }
      }
    });
  }
  deleteFromWishlist(id) {
    
    
          var postData = { user_num: "", access_token: "", wishlist_num: "" };
          postData.user_num = sessionStorage.getItem("user_num");
          postData.access_token = sessionStorage.getItem("access_token");
          postData.wishlist_num = id;

         this.adminservice.removeFromWishlist(postData).subscribe(data => {
          if (data["status"] == "1") {
           this.ngOnInit();
            this.snackbar.open("Product from wishlist remove Successfully", "", {
              duration: 1000
            });
            if(this.previewFlag == '1'){
              
            }else{
             
            }
          
            
          } else if (data["status"] == "10") {
              } else {
            
            this.snackbar.open("Something went wrong..!", "", {
              duration: 5000
            });
           
          }
        });
         
       
       
  }

//end for update cart 13/08/2020 Priyangee

//end for update cart 13/08/2020 Priyangee
 // start for rating optional
  compSettings_ratingOption() {
    this.adminservice
      .fetch_particular_company_registry_with_sno({ comp_num: sessionStorage.getItem("comp_num_new"),s_no:20 })
      .subscribe(data => {
        if (data["status"] == 1) {
         let d = data['data'];
         let v = JSON.parse(d.value);
         if(v== "0"){
           this.rating_option=false;
         }
         else{
           // this.rating_option=false;
         }
         
        } else {
          // this.rating_option=false;
        }
      });
  }
  
  // end for rating option

}

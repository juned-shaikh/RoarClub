
import { Component, OnInit, HostListener } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { RoarclubserviceService } from "../roarclubservice.service";
import {MatSnackBar} from  '@angular/material/snack-bar'
import { CookieService } from "ngx-cookie-service";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent implements OnInit {
  panelOpenState = false;
    registerForm2: FormGroup;

  qty_set;
  megaMenu = false;
  categories;
  no_of_products;
  topCategories;
  public comp_num_new = sessionStorage.getItem("comp_num_new");
  isShow: boolean;
  topPosToStartShowing = 100;
  more = false;
  categories2 = [];
  alreadyCart=false;
alreadyCartStock=false;
  public secondcategory =false;
  public mobilelistorder=false;
  visibleIndex = -1; 
  // categories;
  length;
  category = "1";
  public morecategory = false;
  maxNo = 10;
  offset: any = 1;
  sort_name = "none";
  rangeMin = 5;
  rangeMax = 1000000;
  pages: any = "";
  brandNav = false;
  categoryNav = false;
  out_of_stock = false;
  public loader = false;
  loaderNo = false;
rating_option=true;
  public products: any;
  previewFlag = sessionStorage.getItem('previewFlag');

  constructor(
    private snackbar: MatSnackBar,
    private router: Router,
    private adminservice: RoarclubserviceService,
    private route: ActivatedRoute,
    private cookie: CookieService,
    private formBuilder: FormBuilder,

    private snackBar: MatSnackBar
  ) {}
  brand;
  public subcat = false;
  ninetoys = false;
  ecomtrails = false;
  serverlink;
  host_name;
  userC=false;

  shipping='0';
  
  ratebuy;
  ngOnInit() {
    this.compSettings_ratingOption();
    
 this.registerForm2 = this.formBuilder.group({
      rate_type: [""],
      product_no: [""],
      user_num: sessionStorage.getItem("user_num"),
      access_token: sessionStorage.getItem("access_token")
    });
    // let l = location.origin;
    // var c = l.split("//");
    // this.host_name = c[1];
    // let serv = this.host_name;
    // var s = serv.split(".");
    // this.serverlink = s[1];
    //  this.adminservice
    //       .get_host_link({
    //       comp_num : 0
    //       })
    //       .subscribe(datan => {
    //         if(datan['status']==1){
    //           var h= JSON.parse(datan['result']['value']);
    //            this.serverlink=h['host_link'];
    //         }

    //     })
    //  if(this.serverlink == 'ecomtrails' || this.serverlink == 'Ecomtrails'){
    //     this.ecomtrails = true;
    //   }else if(this.serverlink == '9toys'){
    //     this.ninetoys = true;
    //   }else{
    //     this.ecomtrails = true;

    //   }
    // start for database 28/08/2020
      sessionStorage.setItem("database", "ecomtrails");
           
      this.adminservice.fetch_particular_company_registry_with_sno({comp_num:0,s_no:12}).subscribe(data=>{
      if(data['status']==1){
       let d = data['data'];
         let v = d.value;
         if(v=="ecomtrails"){
            sessionStorage.setItem("database", "ecomtrails");
           this.ecomtrails = true;
         }
         else if(v=="9toys"){
            sessionStorage.setItem("database", "9toys");
            this.ninetoys = true;
         }
         else{
             sessionStorage.setItem("database", "ecomtrails");
             this.ecomtrails = true;
          
         }
        
      }
    
      else{
          let l = location.origin;
        var c = l.split("//");
        this.host_name = c[1];
        let serv = this.host_name;
        var s = serv.split(".");
        this.serverlink = s[1];
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
         if(this.serverlink == 'ecomtrails' || this.serverlink == 'Ecomtrails'){
            this.ecomtrails = true;
          }else if(this.serverlink == '9toys'){
            this.ninetoys = true;
          }else{
            this.ecomtrails = true;

          }
      }
    },
    error=>{
        // this.loading = false;
      }
    );
     // end for database 28/08/2020
   
       // start for add to cart without login
     if (
      (sessionStorage.getItem("user_num") != "" &&
        sessionStorage.getItem("access_token") != "") &&
      (sessionStorage.getItem("user_num") != null &&
        sessionStorage.getItem("access_token") != null)
    ) {
      this.userC=true;
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
          if (data["status"] == "1") {this.count = this.count+1;
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
      
    
    if (this.route.snapshot.paramMap.get("id1") == "brand") {
      this.brandNav = true;
      this.fetch_categories_brand();
      let brandId = this.route.snapshot.paramMap.get("id");
     
      let matche = brandId.replace("&marketplace=ECOMTRAILS", " ");
      let mate2 = matche.match("=");
      let i2 = mate2["index"];
      let mate3 = matche.substring(i2 + 1, matche.length);
      this.brand = mate3;
      this.fetch_product_list_by_brand(this.brand, this.offset);
    } else {
      this.categoryNav = true;
      // this.allCategoryProductCount();
      this.fetch_categories();
      let categoryId = this.route.snapshot.paramMap.get("id");
     

      let matches = categoryId.replace("&marketplace=ECOMTRAILS", " ");
      let mat2 = matches.match("=");
      let i = mat2["index"];
      let mat3 = matches.substring(i + 1, matches.length);
      this.category = mat3;
      this.fetch_product_list(this.category, this.offset);
      this.getSubcat(this.category);
    }
  }
  subcategory;
  getSubcat(categoryno){
    var postData = {
      category_no: "",     
      
      comp_num: this.comp_num_new
    };
    postData.category_no = categoryno;
    
    this.adminservice.fetch_subcategory_all_new(postData).subscribe(data => {
     if(data['status']==1){
       this.subcat = true;
       this.subcategory = data['result'];
     }
      
    });

  }

  fetch_product_list(category, offset) {

    this.products = [];
    var postData = {
      category_no: "",
      offset: "",
      page_items: "40",
      sort_name: this.sort_name,
      min: this.rangeMin,
      max: this.rangeMax,
      user_num: sessionStorage.getItem("user_num"),
      access_token: sessionStorage.getItem("access_token"),
      comp_num: this.comp_num_new
    };
    postData.category_no = category;
    postData.offset = offset;
    this.adminservice.fetch_product_list(postData).subscribe(data => {
      this.loader = true;
      this.products = data["products"];
      this.no_of_products = data ["no_of_products"]
      // this.maxNo=data['products'].length;

      this.pages = data["pages"];
      this.adminservice.changeProductList(this.products);
    });
  }

  fetch_product_list_by_brand(brand, offset) {
    this.products = [];
    var postData = {
      brand_id: "",
      offset: "",
      page_items: "40",
      sort_name: this.sort_name,
      min: this.rangeMin,
      max: this.rangeMax,
      user_num: sessionStorage.getItem("user_num"),
      access_token: sessionStorage.getItem("access_token"),
      comp_num: this.comp_num_new
    };
    postData.brand_id = brand;
    postData.offset = offset;
    this.adminservice.fetch_product_list(postData).subscribe(data => {
      this.loader = true;
      this.products = data["products"];
      // this.maxNo=data['products'].length;

      this.pages = data["pages"];
      this.adminservice.changeProductList(this.products);
    });
  }

  changeOffset(offset) {
    if (offset <= 0) {
      this.offset = 1;
    } else {
      this.offset = offset;
      document.documentElement.scrollTop = 0;
    }
  }
  // addToCart(product) {
  //   var detail = product;
  //   var postData = {
  //     product_no: "",
  //     access_token: "",
  //     user_num: "",
  //     rate_type: "",
  //     comp_num: sessionStorage.getItem("comp_num_new"),
  //     qty: 1
  //   };
  //   postData.product_no = product.product.product_no;
  //   if (product.product_rate[0].is_rent != "2") {
  //     postData.rate_type = product.product_rate[0].rate_type;
  //   } else {
  //     postData.rate_type = product.product_rate[1].rate_type;
  //   }

  //   postData.access_token = sessionStorage.getItem("access_token");
  //   postData.user_num = sessionStorage.getItem("user_num");

  //   if (
  //     (sessionStorage.getItem("user_num") == "" &&
  //       sessionStorage.getItem("access_token") == "") ||
  //     (sessionStorage.getItem("user_num") == null &&
  //       sessionStorage.getItem("access_token") == null)
  //   ) {
  //     if (this.cookie.get("product_id2") == null) {
  //       var product_set = this.cookie.set(
  //         "product_id2",
  //         product.product["product_no"]
  //       );
  //     } else if (this.cookie.get("product_id2") != null) {
  //       var newId = product.product["product_no"];

  //       if (this.cookie.get("product_id2")) {
  //         product = this.cookie.get("product_id2");
  //       } else {
  //         product = [];
  //       }
  //       var co;
  //       co = newId.concat("," + product);
  //       //rate_type topPosToStartShowing
  //       if (
  //         !this.cookie.get("rate_type") ||
  //         this.cookie.get("rate_type") == null
  //       ) {
  //         if (detail.product_rate[0].is_rent != "2") {
  //           var product_set = this.cookie.set(
  //             "rate_type",
  //             detail.product_rate[0].rate_type
  //           );
  //         } else {
  //           var product_set = this.cookie.set(
  //             "rate_type",
  //             detail.product_rate[1].rate_type
  //           );
  //         }
  //       } else if (this.cookie.get("rate_type") != null) {
  //         if (detail.product_rate[0].is_rent != "2") {
  //           var newIdR = detail.product_rate[0].rate_type;
  //         } else {
  //           var newIdR = detail.product_rate[1].rate_type;
  //         }
  //         var productR;
  //         if (this.cookie.get("rate_type")) {
  //           productR = this.cookie.get("rate_type");
  //         } else {
  //           productR = [];
  //         }
  //         var coR;
  //         coR = newIdR.concat("," + productR);

  //         this.cookie.set("rate_type", coR);
  //       }
  //       //rate_type end

  //       this.cookie.set("product_id2", co);
  //       this.snackbar.open("Added to Cart successfully", "", {
  //         duration: 1000
  //       });
  //     }
  //   } else {
  //     if (product.is_cart == "True") {
  //       this.snackbar.open("Already Exists in Cart", "", {
  //         duration: 1000
  //       });
  //     } else {
  //       this.adminservice.addCart(postData).subscribe(data => {
  //         if (data["status"] == "1") {
  //           this.snackbar.open("Added to Cart", "", {
  //             duration: 1000
  //           });
  //           this.adminservice.updateCartCount();
  //         } else if (data["status"] == "0") {
  //           this.snackbar.open("Already Exist in Cart", "", {
  //             duration: 1000
  //           });
  //         }
  //       });
  //     }
  //   }
  // }
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
    postData.product_no = product.product["product_no"];
    if (product.product_rate[0].is_rent != "2") {
      postData.rate_type = product.product_rate[0].rate_type;
    } else {
      postData.rate_type = product.product_rate[1].rate_type;
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
              if(strings2[gg] == product.product['product_no']){
                   this.alreadyCart=true;
if(parseInt(strings2Q[gg])>=parseInt(product.txn_quantity)){
                     this.alreadyCartStock=true;
                   }
                   else{
                 strings2Q[gg]= (parseInt(strings2Q[gg])+1).toString();
                  }
              }
         }
      }
       if(this.alreadyCart == true){
         if(this.alreadyCartStock==false){
      var k=null;
      for (var i = 0; i < strings2Q.length; i++) {
        if(k==null){
           k=strings2Q[i];
       
        }
        else{
           k=k.concat(","+strings2Q[i]);
       
        }
       
      }
      
        this.cookie.set('quantity',k);
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
        var product_set = this.cookie.set("product_id2", product.product["product_no"]);
        this.qty_set=this.cookie.set("quantity", '1');
      } else if (this.cookie.get("product_id2") != null && this.cookie.get("product_id2") != '') {
        var newId = product.product["product_no"];
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
          if (detail.product_rate[0].is_rent != "2") {
            var product_set = this.cookie.set(
              "rate_type",
              detail.product_rate[0].rate_type
            );
          } else {
            var product_set = this.cookie.set(
              "rate_type",
              detail.product_rate[1].rate_type
            );
          }
          // var product_set = this.cookie.set("rate_type", detail.rate[0].rate_type);
        } else if (this.cookie.get("rate_type") != null && this.cookie.get("rate_type") != '') {
          if (detail.product_rate[0].is_rent != "2") {
            var newIdR = detail.product_rate[0].rate_type;
          } else {
            var newIdR = detail.product_rate[1].rate_type;
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
            // if (data["status"] == "1") {
            //   this.cart = data["wishlist"].length;
            // } else {
            //   this.cart = "0";
            // }
             this.count = data['wishlist'].length;
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
            // location.reload();
     //          this.count = this.count+1;
     // this.adminservice.cartCount.next(this.count);
   this.count = this.count+1;
            // cart cunt start
            this.adminservice.fetch_cart_count(postData).subscribe(data => {
              if (data["status"] == "1") {
                this.count = data['cart_count'];
                this.adminservice.cartCount.next(this.count);
              }
            });
            // cart count end
            this.snackbar.open("Added to Cart", "", {
              duration: 1000
            });
                  // this.adminservice.updateCartCount();
this.ngOnInit();
            
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
 // addToWishlistWL(product) {
    
 //      this.snackbar.open("Please Login To Add product in Wishlist", "", {
 //        duration: 1000
 //      });
 //  }
 addToWishlistWL(product) {
    var test= '<a routerLink="/login"> login </a>';
      this.snackbar.open("Please Login To Add product in Wishlist. ", 'Login', {
        duration: 5000
      }).onAction().subscribe(()=>this.router.navigateByUrl('/login'));
  }


  addToWishlist(product) {
    var postData = {
      product_no: "",
      access_token: "",
      user_num: "",
      comp_num: sessionStorage.getItem("comp_num_new")
    };
    postData.product_no = product.product.product_no;
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
      this.router.navigate(["/login"]);
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
            this.snackbar.open("Already Exists in Wishlist", "", {
              duration: 1000
            });
          }
        });
      }
    }
  }

  getSlug(name: string, id): string {
    let slug = name.replace(/\s/, "-") + "-" + id;
    return slug;
  }
  view_product(name, id, slug,quick) {
    let re = " ";
    if(quick=='N'){
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

  setSorting(sort_name) {
    this.sort_name = sort_name;
    this.offset = 1;
    if (this.brandNav == true) {
      this.fetch_product_list_by_brand(this.brand, this.offset);
    } else {
      this.fetch_product_list(this.category, this.offset);
    }
  }
  setRange(min, max) {
    this.rangeMin = min;
    this.rangeMax = max;
    this.fetch_product_list(this.category, this.offset);
    this.ngOnInit();
  }

  // getSlug(name: string, id): string {
  //   let slug = name.replace(/\s/, "-") + "-" + id;
  //   return slug;
  // }

  getImage(image): string {
    return this.adminservice.getImage(image);
  }

  createRange(number) {
    var items: number[] = [];
    for (var i = 1; i <= number; i++) {
      items.push(i);
    }
    return items;
  }
  getThumbnail1(thumbnail1): string {
    return this.adminservice.getThumbnail1(thumbnail1);
  }

  allCategoryProductCount() {
    this.adminservice
      .allCategoryProductCount({
        user_num: sessionStorage.getItem("user_num"),
        comp_num: this.comp_num_new
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
  fetch_categories() {
    let comp=this.comp_num_new;
    if(this.ninetoys==true){
      comp='0';
    }
    this.adminservice
      .fetch_categories({
        user_num: sessionStorage.getItem("user_num"),
        comp_num: comp
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

  fetch_categories_brand() {
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
    else{
    this.adminservice
      .fetchBrands({
        user_num: sessionStorage.getItem("user_num"),
        comp_num: '0'
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
  }

  navigateCategory(name, id) {
    let re = " ";


    this.adminservice
      .fetch_product_list_check({
        comp_num: sessionStorage.getItem("comp_num"),
        category_no: id
      })
      .subscribe(data => {
        if (data["status"] == 1) {
           let slug =
      name.replace(/\s+/g, "-") +
      "-?category_no=" +
      id +
      "&marketplace=ECOMTRAILS";
    // this.router.navigate(['/category', id]);
    // let slug = name.replace(/\s/, "-") + "-?" + id;
    window.scroll(0, 0);
    if(this.previewFlag == '1'){
      // this.router
      // .navigateByUrl("/RefreshComponent", {
      //   skipLocationChange: true
      // })
      // .then(() => 
      this.router.navigate(["/Admin/preview/category-page", slug]);

    }else{
      // this.router
      // .navigateByUrl("/RefreshComponent", {
      //   skipLocationChange: true
      // })
      // .then(() =>

      const currentRoute = this.router.url;

      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(["/category-page", slug]); // navigate to same route
      }); 
      
      //  this.router.navigate(["/category-page", slug]);


    

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
    
    // name.replace(re,"-");
   

    
    this.megaMenu = false;
  }

  navigateBrand(name, id) {
    let re = " ";
    // name.replace(re,"-");

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
    // this.router.navigate(['/category', id]);
    // let slug = name.replace(/\s/, "-") + "-?" + id;
    window.scroll(0, 0);
    if(this.previewFlag == '1'){
      this.router
      .navigateByUrl("/RefreshComponent", {
        skipLocationChange: true
      })
      .then(() => this.router.navigate(["/Admin/preview/category-page", "brand", slug]));

      // const currentRoute = this.router.url;

      // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      //     this.router.navigate(["/category-page", slug]); 
      // }); 


    }else{
      // this.router
      // .navigateByUrl("/RefreshComponent", {
      //   skipLocationChange: true
      // })
      // .then(() =>
      const currentRoute = this.router.url;

      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(["/category-page","brand", slug]); // navigate to same route
      }); 

      // location.reload();
      //  this.router.navigate(["/category-page", "brand", slug]);
      
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
    
   
    // this.router
    //   .navigateByUrl("/RefreshComponent", {
    //     skipLocationChange: true
    //   })
    //   .then(() => this.router.navigate(["/shop", "brand", slug]));
    this.megaMenu = false;
  }
  showmorecategory(){
this.morecategory = true;
  }
  showlesscategory(){
    this.morecategory = false;
  }
  seecategory(){
    this.secondcategory = !this.secondcategory;
  }

  hidecategory(){
    this.secondcategory = false;

    
  }

  showSubItem(ind) {
    if (this.visibleIndex === ind) {
      this.visibleIndex = -1;
    } else {
      this.visibleIndex = ind;
    }
  }

  showlist(){
    this.mobilelistorder= !this.mobilelistorder;
  }
  // start 13/08/2020Priyangee


  


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
    var qty=parseInt(qty2)+1;
    if (qty < 1) {
      this.snackbar.open("Choose Valid quantity.", "", {
        duration: 3000
      });
      this.ngOnInit();
    }
    else if(qty > parseInt(qty_stock)){
      let msg="Quantity limit exceed";
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
            // this.router
            // .navigateByUrl("/RefreshComponent", {
            //   skipLocationChange: true
            // })
            // .then(() =>
             this.router.navigate(["/Admin/preview/login"]);
          }else{
            // this.router
            // .navigateByUrl("/RefreshComponent", {
            //   skipLocationChange: true
            // })
            // .then(() =>
             this.router.navigate(["/login"]);

          }


        }else{
          // this.router
          // .navigateByUrl("/RefreshComponent", {
          //   skipLocationChange: true
          // })
           this.router.navigate(["/login"]);

        }
      } else {
        if (sessionStorage.getItem("access_token") == "") {
          if(this.previewFlag == '1'){
            if ((sessionStorage.getItem("comp_num_new") == "0") && (this.host_name != "localhost:4209")) {
 
                // this.router
                // .navigateByUrl("/RefreshComponent", {
                //   skipLocationChange: true
                // })
                // .then(() =>
                 this.router.navigate(["/Admin/preview/login"]);
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
  //end 13/08/2020
 
  rates(product) {
    console.log(product);
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
      this.registerForm2.get("product_no").setValue(product.product.product_no);
      if (
          product.product_rate[0].rate_type != "2" &&
          product.product_rate[0].rate_type != 2
        ) {
        this.ratebuy=product.product_rate[0].rate_type;
       this.registerForm2.get("rate_type").setValue(product.product_rate[0].rate_type);
      }
      else if( product.product_rate[1].rate_type != "2" &&
          product.product_rate[1].rate_type != 2){
         this.ratebuy=product.product_rate[1].rate_type;
       this.registerForm2.get("rate_type").setValue(product.product_rate[1].rate_type);
     
      }
      for (let k = 0; k < product.product_rate.length; k++) {
       
        if (
          product.product_rate[k].rate_type == "2" ||
          product.product_rate[k].rate_type == 2
        ) {
          this.shipping=product.product_rate[k].rate;
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
   // start for rating optionalnavigateCategory
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

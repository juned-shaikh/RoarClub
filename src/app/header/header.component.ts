
import { Component, OnInit } from "@angular/core";
// import { access } from 'fs';
import { RoarclubserviceService } from "../roarclubservice.service";
import {MatSnackBar} from  '@angular/material/snack-bar';
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { UserService } from "../_services";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user_num = sessionStorage.getItem("user_num");
  access_token = sessionStorage.getItem("access_token");
  username = sessionStorage.getItem("username");
  email = sessionStorage.getItem("email");
  nm;
  public showsearch =false;
  public showsearchr =false;
  public hidesubcategory = true;
  searchFocus = false;
  megaMenu = false;
  public is_logged_in = false;
  public is_logged_out = false;
  flag = localStorage.getItem("flag");
  flag1 = localStorage.getItem("flag1");
  cart;
  public secondcategory =false;
  public mobilelistorder=false;
  visibleIndex = -1; 
  categories;
  brands=[];
  slice;
  public sidenav =false;
  public sidenav1 =false;
  more = false;
  public visibleIndexw =false;
  categories2 = [];
  categoryresp=[];
  topCategories;
  menuShow = false;
  public searchList: any = {
    category: [],
    brand: [""],

    product: null
  };
  isUserLoggedIn: boolean;
  previewFlag = sessionStorage.getItem('previewFlag');

  constructor(
    private router: Router,
    private adminService: RoarclubserviceService,
    private snackbar: MatSnackBar,
    private dataSharingService: UserService,
    private cookie: CookieService
  ) {
    // this.fetchCartCount2();
    this.adminService.cartCount
    .subscribe(
      (data)=>{
        this.cart = data
      }
    )
   
    this.dataSharingService.isUserLoggedIn.subscribe(value => {
      this.isUserLoggedIn = value;
    });
    //  adminService.cartCount$.subscribe(data => {
    //   this.fetchCartCount2();
    // });
  }
  tag = false;
  notag = true;
  host_name;
  companydata;
  comp_num_new;
  tagline;
  public preview = false;
  public nopreview = false;
  
  
  hostd;
  ecomtrails = false;
  ninetoys = false;

  roarclub = false;
  mlm = false;
  serverlink;
  ngOnInit() {
   
    let l = location.origin;
    var c = l.split("//");
    this.host_name = c[1];
    let serv = this.host_name;
    var s = serv.split(".");
    this.serverlink = s[1];
     //    this.adminService
     //      .get_host_link({
     //      comp_num : 0
     //      })
     //      .subscribe(datan => {
     //        if(datan['status']==1){
     //          var h= JSON.parse(datan['result']['value']);
     //           this.serverlink=h['host_link'];
     //        }

     //    })

     // if(this.serverlink == 'ecomtrails'){
     //    this.ecomtrails = true;
     //  }else if(this.serverlink == '9toys'){
     //    this.ninetoys = true;
     //  }else{
     //    this.ecomtrails = true;

     //  }
          
    // if(this.ecomtrails == true){
    //   this.adminService
    //   .fetchBrandsEcom({//for ecom
    //    // .fetchBrands({
    //       // access_token: this.access_token,user_num: this.user_num
    //       comp_num : this.comp_num_new 
    //     })
    //     .subscribe(
    //       data => {
    //         if (data["status"] == 1) {
    //           this.brands = data['result'];
  
    //         } else if (data["status"] == 10) {
              
    //         } else {
    //         }
    //       },
    //       error => {
    //         // this.loading = false;
    //       }
    //     );
    //   }
    //   else{
    //      this.adminService
    //   // .FetchBrandEcom({//for ecom
    //    .fetchBrands({
    //       // access_token: this.access_token,user_num: this.user_num
    //       comp_num : 0
    //     })
    //     .subscribe(
    //       data => {
    //         if (data["status"] == 1) {
    //           this.brands = data['result'];
  
    //         } else if (data["status"] == 10) {
              
    //         } else {
    //         }
    //       },
    //       error => {
    //         // this.loading = false;
    //       }
    //     );
    //   }


      if( (this.host_name == "vendor.ecomtrails.com"  && sessionStorage.getItem('previewFlag') == '1' ) || (this.host_name == "signup.ecomtrails.com"  && sessionStorage.getItem('previewFlag') == '1' ) || (this.host_name == "vendor.9toyz.com"  && sessionStorage.getItem('previewFlag') == '1' ) || (this.host_name == "http://localhost:4200"  && sessionStorage.getItem('previewFlag') == '1' ) ){
        this.ecomtrails = true;
        this.ninetoys = false;
        this.comp_num_new = sessionStorage.getItem('comp_num_new');
        this.adminService
          .get_host_link_of_comapny({
          comp_num : this.comp_num_new
          })
          .subscribe(datan => {
            if(datan['status']==1){
              this.hostd = datan['result'];
            }

        })

         
        this.basicCompany(this.comp_num_new);
        this.compTagline(this.comp_num_new);
        this.fetch_categories(this.comp_num_new);        
        if (this.user_num && this.access_token && this.user_num!=null && this.access_token!=null) {
          this.fetchCartCount(this.comp_num_new);
        } else {
          this.fetchWithoutLoginCartCOunt(this.comp_num_new);
        }
        this.brandFetch(this.comp_num_new);
        this.preview = true;
       

      }
      else if((this.host_name == "vendor.9toys.in"  && sessionStorage.getItem('previewFlag') == '1') || (this.host_name == "signup.9toys.in"  && sessionStorage.getItem('previewFlag') == '1')){
        this.ninetoys = true;
        this.ecomtrails = false;
        this.comp_num_new = sessionStorage.getItem('comp_num_new');
        this.adminService
          .get_host_link_of_comapny({
          comp_num : this.comp_num_new
          })
          .subscribe(datan => {
            if(datan['status']==1){
              this.hostd = datan['result'];
            }

        })
        this.basicCompany(this.comp_num_new);
        this.compTagline(this.comp_num_new);
        this.fetch_categories(this.comp_num_new);        
        if (this.user_num && this.access_token && this.user_num!=null && this.access_token!=null) {
          this.fetchCartCount(this.comp_num_new);
        } else {
          this.fetchWithoutLoginCartCOunt(this.comp_num_new);
        }
        this.preview = true;
        this.brandFetch(this.comp_num_new);
       
      }
// start for roarclub and mlm
   else if((this.host_name == "vendor.roarclub.in"  && sessionStorage.getItem('previewFlag') == '1') || (this.host_name == "signup.roarclub.in"  && sessionStorage.getItem('previewFlag') == '1')){
        this.ecomtrails = true;
        this.roarclub = true;
         sessionStorage.setItem("comp_num_new",'0');
         this.comp_num_new ='0'; this.comp_num_new = sessionStorage.getItem('comp_num_new');
        this.adminService
          .get_host_link_of_comapny({
          comp_num : this.comp_num_new
          })
          .subscribe(datan => {
            if(datan['status']==1){
              this.hostd = datan['result'];
            }

        })
        this.basicCompany(this.comp_num_new);
        this.compTagline(this.comp_num_new);
        this.fetch_categories(this.comp_num_new);        
        if (this.user_num && this.access_token && this.user_num!=null && this.access_token!=null) {
          this.fetchCartCount(this.comp_num_new);
        } else {
          this.fetchWithoutLoginCartCOunt(this.comp_num_new);
        }
        this.preview = true;
        this.brandFetch(this.comp_num_new);
       
      }
       else if((this.host_name == "associate.909corns.in"  && sessionStorage.getItem('previewFlag') == '1') || (this.host_name == "signup.909corns.in"  && sessionStorage.getItem('previewFlag') == '1')){
       this.ecomtrails = true;
        this.mlm = true;
         sessionStorage.setItem("comp_num_new",'0');
         this.comp_num_new ='0';
        this.comp_num_new = sessionStorage.getItem('comp_num_new');
        this.adminService
          .get_host_link_of_comapny({
          comp_num : this.comp_num_new
          })
          .subscribe(datan => {
            if(datan['status']==1){
              this.hostd = datan['result'];
            }

        })
        this.basicCompany(this.comp_num_new);
        this.compTagline(this.comp_num_new);
        this.fetch_categories(this.comp_num_new);        
        if (this.user_num && this.access_token && this.user_num!=null && this.access_token!=null) {
          this.fetchCartCount(this.comp_num_new);
        } else {
          this.fetchWithoutLoginCartCOunt(this.comp_num_new);
        }
        this.preview = true;
        this.brandFetch(this.comp_num_new);
       
      }
// end for roarclub and mlm

      else{
       
        this.adminService
        .hostlink({ host_name: this.host_name })
        .subscribe(data => {
          if (data["status"] == 1) {
            if (data["result"].comp_num == "01"){

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

                  this.comp_num_new = data["result"].comp_num;
                  sessionStorage.setItem(
                    "comp_num_new",
                    data["result"].comp_num
                  );
                  this.basicCompany(this.comp_num_new);
                  this.compTagline(this.comp_num_new);
                  this.fetch_categories(this.comp_num_new);
                  // this.userProfile(this.comp_num_new);
                  if (this.user_num && this.access_token && this.user_num!=null && this.access_token!=null) {
                    this.fetchCartCount(this.comp_num_new);
                  } else {
                    this.fetchWithoutLoginCartCOunt(this.comp_num_new);
                  }
                   this.brandFetch(this.comp_num_new);
       
                } else {
                  this.router.navigate(["/404-page-not-found"]);
                }
              } else {
                this.router.navigate(["/page-not-working"]);
              }
            }
          } else {
            sessionStorage.setItem("not-found", "1");
            this.router.navigate(["404-page-not-found"]);
          }
        });

      }
      

      
    // }
    if (!this.user_num && !this.access_token) {
      this.is_logged_out = true;
      this.is_logged_in = false;
    } else {
      this.is_logged_in = true;
      this.is_logged_out = false;
    }
  }
  fetch_categories(dd){
    if(this.ninetoys==true || this.mlm==true || this.roarclub==true){
      dd='0';
    }
    this.adminService
    .fetch_categories({

      // this.adminService
    // .fetch_categories_ecom({//for ecom
      access_token: this.access_token,
      user_num: this.user_num,
      comp_num : dd
    })
    .subscribe(data => {
      if (data["status"] == 1) {
        this.categories = data["result"];
        this.categoryresp = data["result"];
        let size = this.categories.length;
        if (size > 6) {
          for (let n = 0; n < 5; n++) {
            this.more = true;
            this.categories2.push(this.categories[n]);
          }
          this.menuShow = true;
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

  allCategoryProductCount(dd) {
    this.adminService
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

  fetchWithoutLoginCartCOunt(dd) {
    var quotes = this.cookie.get("product_id2");
    var d = quotes.replace(/%2C/g, ",");
    var d1 = d.split(",");

    var dn = quotes.replace(/,""/g, "");
    var postData2 = { product_no: "", comp_num: "" };
    postData2.product_no = dn;
    postData2.comp_num = dd;
    this.adminService.fethcProductWishlist(postData2).subscribe(data => {
      if (data["status"] == "1") {
        this.cart = data["wishlist"].length;
      } else {
        this.cart = "0";
      }
    });
  }
  fetchCartCount(dd) {
    var postData = { user_num: "", access_token: "", comp_num: "" };
    postData.user_num = sessionStorage.getItem("user_num");
    postData.access_token = sessionStorage.getItem("access_token");
    postData.comp_num = dd;
    if (postData.user_num != "" || postData.access_token != "") {
      this.adminService.fetchCart(postData).subscribe(data => {

        if (data["status"] == "1") {
          this.cart = data["cart"].cart_inventory.length;
        } else if ((data["status"] = "10")) {
          this.cart = "0";
        }
      });
    } else {
      this.snackbar.open("Please Login First.", "", {
        duration: 2000
      });
    }
  }
  
  compTagline(dd) {
    this.adminService
      .fetch_company_tagline({
        comp_num: dd
      })
      .subscribe(data => {
        if (data["status"] == 1) {
          // var d = data["data"][0];
          // this.tagline = JSON.parse(d.value);
          this.tagline = data["data"].value;
          this.tag = true;
          this.notag = false;
        } else if (data["status"] == 0) {
          this.tag = false;
          this.notag = true;
        }
      });
  }
  basicCompany(dd) {
    this.adminService
      .getCompnyBasicDetail({
        comp_num: dd
      })
      .subscribe(data => {
        if (data["status"] == 1) {
          this.companydata = data["data"];
          if (this.access_token && this.user_num) {
            if (dd == sessionStorage.getItem("comp_num")) {
              this.nm = this.companydata.receiver_name;
            } else {
              this.adminService
                .get_profile({
                  access_token: this.access_token,
                  user_num: this.user_num,
                  comp_num: dd
                })
                .subscribe(data => {
                  if (data["status"] == 1) {
                    this.nm = data["result"].name;
                  }
                });
            }
          }
        } else if (data["status"] == 0) {
        }
      });
  }

  logout() {
    var res = confirm("Are you sure you want to logout.");
     if(res){
      const currentRoute = this.router.url;

      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(["/home"]); 
      }); 
      localStorage.setItem("flag1", "0");
      sessionStorage.clear();
      
      var rtoken = sessionStorage.getItem('noti_token');
      var topic = "user_"+sessionStorage.getItem('user_num');
      
      
      this.adminService.unsubscribe_topic({topic_name : topic , token : rtoken}).subscribe(data =>{
        if(data['status']=='1'){
          console.log("topic unsubscribed successfully");
          location.reload();
          const currentRoute = this.router.url;

          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(["/"]); 
          }); 
  
        }else{
          console.log("topic not unsubscribed")
        }
      })
      this.router.navigate(["/"]);
     }

  }
  redirectTo(url: string) {
    throw new Error("Method not implemented.");
  }
  search(keys) {
    let postData = { keys: keys, comp_num: "" };
    postData.comp_num = sessionStorage.getItem("comp_num_new");
    if(this.ninetoys==true || this.mlm==true || this.roarclub==true){
      postData.comp_num ='0';
    }
  //    if(this.serverlink == 'ecomtrails'){
  //   this.adminService.searching_ecom(postData).subscribe(
  //     data => {
  //       this.searchList = data;
  //       // this.searchList = data;
  //       this.adminService.changeProductList(this.searchList.Product);
  //     },
  //     error => {
  //     }
  //   );
  // }
  // else{
     this.adminService.search(postData).subscribe(
      data => {
        this.searchList = data;
        // this.searchList = data;
        this.adminService.changeProductList(this.searchList.Product);
      },
      error => {
      }
    );
  // }
  }
  getSlug(name: string, id, slug): string {
    // let slug = name.replace(/\s+/g, '-') + "-?product_no=" + id  + "&marketplace=ECOMTRAILS";
    // let slug = name.replace(/\s/, "-") + "-" + id;
    return slug;
  }
  navigateCategory(name, id) {

    this.adminService
      .fetch_product_list_check({
        comp_num: sessionStorage.getItem("comp_num"),
        category_no: id,
      })
      .subscribe(data => {
        if (data["status"] == 1) {
     
    let slug =
      name.replace(/\s+/g, "-") +
      "-?category_no=" +
      id +
      "&marketplace=ECOMTRAILS";

    window.scroll(0, 0);
    if(this.previewFlag == '1'){
     
      this.router.navigate(["/Admin/preview/category-page", slug]);
    }else{
      

      const currentRoute = this.router.url;

      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(["/category-page", slug]); // navigate to same route
      }); 

  // this.router
  //     .navigateByUrl("/RefrshComponent", {
  //       skipLocationChange: true,
  //     })
  //     .then(() => this.router.navigate(["/category-page", slug]));

  // this.ngOnInit();
  // window.location.reload();
      // this.router.navigate(["/category-page", slug]);

    }
          
        }  else if (data["status"] == 0) {
           this.snackbar.open(
            "No Products Found. ",
            "",
            {
              duration: 500,
              horizontalPosition: "center"
            }
          );
        }
      });
    
   
    

    // this.router
    //   .navigateByUrl("/RefreshComponent", {
    //     skipLocationChange: true
    //   })
    //   .then(() => this.router.navigate(["/shop", slug]));
    this.megaMenu = false;
  }
  
  showsearchbar(){
this.showsearch = !this.showsearch;
  }
  showsearchbarr(){
    this.showsearch = false; 
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
  openNav() {
    document.getElementById("mySidenav").style.left = "0";
    
    this.sidenav = true;
  }

  closeNav() {
    document.getElementById("mySidenav").style.left = "-90%";
    document.body.style.backgroundColor = "white";
    this.sidenav = false;
  }


  openNav1() {
    document.getElementById("mySidenav1").style.right = "0";
   
    this.sidenav1 = true;
  }

  closeNav1() {
    document.getElementById("mySidenav1").style.right = "-90%";
  
    document.body.style.backgroundColor = "white";
    this.sidenav1 = false;
  }

  doesExist(val) {
    return val != '';
  }
  getbrandImage(image):string{
    return this.adminService.getbrandImage(image);
  }
  brandFetch(dd){
    if(this.ecomtrails == true && this.roarclub == false && this.mlm == false){
      this.adminService
      .fetchBrandsEcom({
     
          comp_num : dd
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
          }
        );
      }
      else{
         this.adminService
       .fetchBrands({
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
          }
        );
      }

  }
  gotoPage= function(pagename:string){
    this.router.navigateByUrl('/category-page');
    }
    hidesubcategoryclick(){
      this.hidesubcategory = !this.hidesubcategory;
        }
}










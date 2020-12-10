import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { RoarclubserviceService } from "../roarclubservice.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  public access_token = sessionStorage.getItem("access_token");
  public user_num = sessionStorage.getItem("user_num");
  wishlist;
  product;
  wishlist_num;
  previewFlag = sessionStorage.getItem('previewFlag');

  constructor(
    private snackbar: MatSnackBar,
    private router: Router,
    private adminService: RoarclubserviceService,
    private cookie: CookieService
  ) { }

  ngOnInit() {
    this.adminService.fetchWishlist({user_num : this.user_num , access_token: this.access_token,comp_num:sessionStorage.getItem("comp_num_new"),}).subscribe(data => {
      
      if (data["status"] == "1") {
        this.wishlist = data['wishlist'];
      

      }else{

      }
    });
  }

  deleteFromWishlist(id) {
    var res = confirm("Are you sure you want to delete this wishlist product.");
    if(res){
    
          var postData = { user_num: "", access_token: "", wishlist_num: "" };
          postData.user_num = sessionStorage.getItem("user_num");
          postData.access_token = sessionStorage.getItem("access_token");
          postData.wishlist_num = id;

         this.adminService.removeFromWishlist(postData).subscribe(data => {
          if (data["status"] == "1") {
           
            this.snackbar.open("Deleted Successfully", "", {
              duration: 1000
            });
            if(this.previewFlag == '1'){
              this.router
              .navigateByUrl("/RefreshComponent", {
                skipLocationChange: true
              })
              .then(() => this.router.navigate(["/Admin/home_profile/wishlist"]));
              
            }else{
              this.router
              .navigateByUrl("/RefreshComponent", {
                skipLocationChange: true
              })
              .then(() => this.router.navigate(["/home_profile/wishlist"]));

            }
          
            
          } else if (data["status"] == "10") {
           
          } else {
            
            this.snackbar.open("Something went wrong..!", "", {
              duration: 5000
            });
           
          }
        });
         
       
        }
  }

  getImage(image): string {
    return this.adminService.getImage(image);
  }
  getThumbnail1(thumbnail1): string {
    return this.adminService.getThumbnail1(thumbnail1);
  }
  getThumbnail2(thumbnail2): string {
    return this.adminService.getThumbnail2(thumbnail2);
  }

  getGalleryImage(image): string {
    return this.adminService.getGalleryImage(image);
  }
  getGalleryThumbnail1(thumbnail1): string {
    return this.adminService.getGalleryThumbnail1(thumbnail1);
  }
  getGalleryThumbnail2(thumbnail2): string {
    return this.adminService.getGalleryThumbnail2(thumbnail2);
  }
count=0;
   addToCart(product) {
    var detail=product;
  var postData = {
     product_no: "",
      access_token: "",
      user_num: "",
      rate_type:"",
      qty:1,
      comp_num:sessionStorage.getItem("comp_num_new"),
  };
  postData.product_no = product.product_no;
  if(product.product_rate[0].is_rent!='2'){
   postData.rate_type=product.product_rate[0].rate_type;
  }
  else{
     postData.rate_type=product.product_rate[1].rate_type;
  }
  postData.access_token = sessionStorage.getItem("access_token");
  postData.user_num = sessionStorage.getItem("user_num");
 

    if (product.is_cart == "True") {
      this.snackbar.open("Already Exists in Cart", "", {
        duration: 1000
      });
    } else {
      this.adminService.addCart(postData).subscribe(data => {
        if (data["status"] == "1") {
          
          // cart cunt start
            this.adminService.fetch_cart_count(postData).subscribe(data => {
              if (data["status"] == "1") {
                this.count = data['cart_count'];
                this.adminService.cartCount.next(this.count);
              }
            });
            this.snackbar.open("Added to Cart", "", {
            duration: 1000
          });
            
        }
        else if (data["status"] == "0") {
          this.snackbar.open("Already Exist in Cart", "", {
            duration: 1000
          });
        }
      });
    }
  
}
 view_product(name, id,slug,quick) {
   if(quick=='N'){
     let re=" ";
   
   
    if(this.previewFlag == '1'){
      this.router
      .navigateByUrl("/RefreshComponent", {
        skipLocationChange: true
      })
      .then(() => this.router.navigate(["/Admin/preview/product", slug]));


    }else{
      this.router
      .navigateByUrl("/RefreshComponent", {
        skipLocationChange: true
      })
      .then(() => this.router.navigate(["/product", slug]));

    }
    }
  }



  addtocartFromWishlist(id) {
    
          var postData = { user_num: "", access_token: "", wishlist_num: "" };
          postData.user_num = sessionStorage.getItem("user_num");
          postData.access_token = sessionStorage.getItem("access_token");
          postData.wishlist_num = id;

         this.adminService.removeFromWishlist(postData).subscribe(data => {
          if (data["status"] == "1") {
           
            this.snackbar.open("Added to cart Successfully ", "deleted from Wishlist", {
              duration: 1000
            });
            if(this.previewFlag == '1'){
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
          
            
          } else if (data["status"] == "10") {
           
          } else {
            
            this.snackbar.open("Something went wrong..!", "", {
              duration: 5000
            });
           
          }
        });
         
       
        
  }


}

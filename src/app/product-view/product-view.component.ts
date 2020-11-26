import { NgxImageZoomModule } from 'ngx-image-zoom';
//import { LightboxModule } from "@ngx-gallery/lightbox";
import { Gallery, GalleryItem, ImageItem, ThumbnailsPosition, ImageSize } from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';
import { map } from 'rxjs/operators';

import { NgxImgZoomService } from "ngx-img-zoom";
import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { RoarclubserviceService } from "../roarclubservice.service";
import {MatSnackBar} from  '@angular/material/snack-bar'
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { CookieService } from "ngx-cookie-service";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import * as _ from 'lodash';
import { Title, Meta } from "@angular/platform-browser";
// import {
//   Gallery,
//   GalleryItem,
//   ImageItem,
//   ThumbnailsPosition,
//   ImageSize
// } from "@ngx-gallery/core";
// import { LightboxModule } from "@ngx-gallery/lightbox";
// import { GallerizeModule } from '@ngx-gallery/gallerize';

// import { Gallery, GalleryItem, ImageItem, ThumbnailsPosition, ImageSize } from 'ng-gallery';
// import { Lightbox } from 'ng-gallery/lightbox';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {
  public product_no = sessionStorage.getItem("pno");
  categories;
  size_with_color=[]; 
  estimate_count=0;
  loader;
  ship_ask=true;
  cart_check=false;
  cart_inventory;
  addresses;
  rating_option=true;
  percentmain;
  percentmain1=0;
  percentmain2=0;
  percentmain3=0;
  percentmain4=0;
  percentmain5=0;
  addresses_pincode;
  ratings = 0;
  coloring;
  otpForm: FormGroup;
   items23=[];

  //items23: GalleryItem[];
  sizing;
  ratings_count = 0;
  reviews_count = 0;
  all_ratings = [];
  reviews;
  qty_set;
  topCategories;
  product;
  product_category;
  product_rate;
  product_tags;
  product_specification;
  product_image;
  productId;
  similarPro;
  ratebuy;
  shipping;
  alreadyCart = false;
  alreadyCartStock = false;
  product_groups;
  product_groups_color=[];
  product_groups_color_image=[];
  product_groups_size=[];
  specificCart2 = [];
  categories2 = [];
  comp_num_new = sessionStorage.getItem("comp_num_new");
  userC = false;
  closeResult: string;
  registerForm2: FormGroup;
  imageView;
  shipping_rate=0;
  shipping_name=null;
  megaMenu = false;
  previewFlag = sessionStorage.getItem('previewFlag');
  constructor(
    private ngxImgZoom: NgxImgZoomService,
    private snackbar: MatSnackBar,
    private route: ActivatedRoute,
    private _location: Location,
    private router: Router,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,

    private adminservice: RoarclubserviceService,
    private cookie: CookieService,
    private titleService: Title,
    private meta: Meta,
    public gallery: Gallery,
     public lightbox: Lightbox,
    
    //public lightbox: LightboxModule
  )
   { 
      this.ngxImgZoom.setZoomBreakPoints([
    { w: 100, h: 100 },
    { w: 150, h: 150 },
    { w: 200, h: 200 },
    { w: 250, h: 250 },
    { w: 300, h: 300 }
     ]);
}
  // open(content) {
  //   this.modalService
  //     .open(content, { ariaLabelledBy: "modal-basic-title" })
  //     .result.then(
  //       result => {
  //         this.closeResult = `Closed with: ${result}`;
  //       },
  //       reason => {
  //         this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //       }
  //     );
  // }
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
  meta_title;
  meta_description;
  meta_keyword;
  site;
  main;
  etd="5-6 days";
  wishlist_check=false;
  wishlist_num;
  estimate_self=false;


style:string
img;
ecomtrails = false;
  ninetoys = false;
  serverlink;
  host_name;
  host_link;
  is_national=false;
  is_estimate=false;
  ngOnInit() {
    window.scroll(0, 0);
    this.main = location.origin;

    let url = this.router.url;
    let site2 = url;
    let site3 = site2.replace("?", "%3F");
    this.site = site3.replace("=", "%3D");
    this.site = encodeURIComponent(this.site);


    if (
      sessionStorage.getItem("user_num") &&
      sessionStorage.getItem("user_num") != null && sessionStorage.getItem("user_num") != ''
    ) {
      this.userC = true;
    }
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

     if(this.serverlink == 'ecomtrails'){
        this.ecomtrails = true;
      }else if(this.serverlink == '9toys'){
        this.ninetoys = true;
      }else{
        this.ecomtrails = true;

      }
          
   
    this.fetch_categories();

    this.productId = this.route.snapshot.paramMap.get("id");
    // let matches = this.productId.match(/\d*$/);
    // this.product_no = matches[0];
    let matches = this.productId.replace("&marketplace=ECOMTRAILS", " ");
    let mat2 = matches.match("=");
    let i = mat2["index"];
    let mat3 = matches.substring(i + 1, matches.length);
    this.product_no = mat3;
     this.otpForm = this.formBuilder.group({
      cod: ["1"],
      comp_num: sessionStorage.getItem("comp_num_new"),
      delivery_postcode:[""],
      weight:[""]
    });
//start 21/08/2020
this.compSettings();
this.compSettings2();
this.compSettings_ratingOption();
//end 21/08/2020

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
               this.snackbar.open("Added to Cart", "", {
              duration: 1000
            });    
          
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
      // this.getAddresses();
    this.getProduct(mat3);
    // if(this.userC==true){
    //   this.getAddresses();

    // }
    // this.estimate_time_delivery();
    // this.getProduct(matches[0]);
    //    this.adminservice.viewProduct({product_no : matches[0]}).subscribe(
    //      data => {
    //        if (data["status"] == 1) {
    //          this.product = data['product'];
    //          this.product_category = data['product_category'];
    //          this.product_rate = data['product_rate'];
    //          this.product_tags = data['product_tags'];
    //          this.product_specification = data['product_specification'];
    //          this.product_image = data['product_image'];
    // // start similar product
    //          let postData={brand_id:this.product.brand_id,category_no:this.product_category[0].category_no};
    //     this.adminservice.similar_product(postData).subscribe(data => {
    //         if (data["status"] == 1) {

    //           this.similarPro=data['result'];

    //         } else if (data["status"] == 0) {

    //         }
    //       });
    //     // end similar product
    //        }else if(data['status']==10) {

    //        }
    //        else if(data['status']== 0){

    //        }
    //      },
    //      error => {
    //        this.snackbar.open("Something Went wrong please try again. ", "", {
    //          duration: 3000
    //        });
    //      }
    //    );
    this.registerForm2 = this.formBuilder.group({
      rate_type: [""],
      product_no: this.product_no,
      user_num: sessionStorage.getItem("user_num"),
      access_token: sessionStorage.getItem("access_token")
    });
  }
  colors(color){
    this.coloring=color;
  location.reload;
    //start 1/09/2020
    //   var index =-1;
    //  if(this.sizing != null){
    //    var find =  { color: color, size:this.sizing  }

    //     for(let k=0;k<this.product_groups.length;k++){
    //       if(this.product_groups[k].color==color && this.product_groups[k].size==this.sizing ){
    //         index=k;
    //       }
    //     }
         

 
    //     if(index < 0){
    //        index = this.product_groups.findIndex(x => x.color === color);
    
    //     }
    // }
    // else{
    //      index = this.product_groups.findIndex(x => x.color === color);
  
    // }//109/2020

    // start 1/09/2020
    var index =-1;
    var index2=0;
    if(this.product_groups.length>0){
          this.size_with_color=[];
          this.product_groups_size=[];
            for(let x=0;x<this.product_groups.length;x++){
              if(color==this.product_groups[x].color){
                index2++;

                if(index2==1){
                  index=x;
                }
                // if(this.product_groups[x].size=='' || this.product_groups[x].size==null){
                //    this.size_with_color.push({size:"Not Define"});
                //  //console.log(this.size_with_color);

                // }
                //   else{
                     this.size_with_color.push({size:this.product_groups[x].size});
                  // }
                
              }
             
            }

             let unique2=this.size_with_color.map(item => item.size).filter((value, index, self) => self.indexOf(value) === index);
        this.product_groups_size=unique2;
     // if(this.product_groups_size.length>0){
     //      for(let d=0;d<this.product_groups_size.length;d++){
     //        if(this.product_groups_size[d]=='' || this.product_groups_size==null){
     //          this.product_groups_size[d]="Not Define";
     //        }
     //      }
     //   }
           
        }
         this.product_groups_size = this.product_groups_size.filter(function (e) {return e != '';});
   
    //end 1/09/2020
   this.product = this.product_groups[index];
    if(this.product_groups[index].size != this.sizing){
       this.sizing=null;
     }
      if(this.product_groups[index].size != null){
       this.sizing=this.product_groups[index].size;
     }
    this.imageView = this.product.image[0].image_link;
    this.img = this.imageView;
     this.product_rate = this.product.rates;

      this.ratings = this.product_groups[index].ratings;
          this.ratings_count = this.product_groups[index].ratings_count;
          this.reviews_count = this.product_groups[index].reviews_count;
          this.reviews = this.product_groups[index].reviews;
          this.all_ratings = this.product_groups[index].all_ratings;



      let site2 = "/product/"+this.product.slug;
      this.site=site2;
      this.site = site2.replace(this.main, "");
    
     this.site = this.site.replace("?", "%3F");
    this.site = this.site.replace("=", "%3D");
   
     this.site = encodeURIComponent(this.site);
  this.getProduct2(this.product.product_no);
  
    
    

  }
  sizes(size){
    this.sizing=size;
    // if(size=="not define"){
    //   this.sizing="";
    //   size="";
    // }
    var index=-1;
    if(this.coloring != null){
       var find =  { color: this.coloring, size:size  }
         
        for(let k=0;k<this.product_groups.length;k++){
          if(this.product_groups[k].color== this.coloring && this.product_groups[k].size==size ){
            index=k;
          }
        }

        if(index < 0){
            index = this.product_groups.findIndex(x => x.size === size);
    
        }
    }
    else{
         index = this.product_groups.findIndex(x => x.size === size);
   
    }
   //console.log(index);
     this.product = this.product_groups[index];
     if(this.product_groups[index].color != this.coloring){
       this.coloring=null;
     }
     if(this.product_groups[index].color != null){
       this.coloring=this.product_groups[index].color;
     }
      this.imageView = this.product.image[0].image_link;
      this.img = this.imageView;
       this.product_rate =this.product.rates;

        this.ratings = this.product_groups[index].ratings;
          this.ratings_count = this.product_groups[index].ratings_count;
          this.reviews_count = this.product_groups[index].reviews_count;
          this.reviews = this.product_groups[index].reviews;
          this.all_ratings = this.product_groups[index].all_ratings;

     let site2 = "/product/"+this.product.slug;
      this.site=site2;
       this.site = site2.replace(this.main, "");
    this.site = this.site.replace("?", "%3F");
     // let a="/product/";
      this.site = encodeURIComponent(this.site);
  //console.log(this.product.product_no);
  this.getProduct2(this.product.product_no);
  }
  getProduct(match) {
    let pro = { product_no: match, comp_num: this.comp_num_new };
    if(this.userC==true){
pro['user_num']=sessionStorage.getItem('user_num');
pro['access_token']=sessionStorage.getItem('access_token');
    }
    this.adminservice.viewProduct(pro).subscribe(
      data => {
       
        if (data["status"] == 1) {
          this.product = data["product"];
           this.loader=true;
           if(this.userC==true){
             this.wishlist_num=data['wishlist_num'];
             this.wishlist_check=data['wishlist_check'];
             this.cart_check=data['cart_check'];
             this.cart_inventory=data['cart_inventory'];
            
           }
          if(this.product.color !=null){
            this.coloring=this.product.color;
          }
           if(this.product.size !=null){
            this.sizing=this.product.size;
          }
          this.product_category = data["product_category"];
          this.product_rate = data["product_rate"];
          for(let scount=0;scount<this.product_rate.length;scount++){
            if(this.product_rate[scount].is_rent ==2 || this.product_rate[scount].is_rent=='2'){
              this.shipping_rate=this.product_rate[scount].rate;
              this.shipping_name=this.product_rate[scount].name;
            }
          }
          this.otpForm.get("comp_num").setValue(this.product.comp_num);
       this.otpForm.get("weight").setValue(this.product.final_weight);
//start for estimate time delivery 20/08/2020
if(this.userC==true){
      this.getAddresses();

    }
    else if( this.estimate_self==true){
      this.otpForm.get("delivery_postcode").setValue('452003');
//.//console.log(1);
         this.estimate_time_delivery();
    }
//end for estimate time delivery 20/08/2020
          this.product_tags = data["product_tags"];
          this.product_specification = data["product_specification"];


          this.product_image = data["product_image"];

          this.imageView = this.product_image[0].image_link;


          this.img = this.imageView;

        
          
          for(let y=0;y<this.product_image.length;y++){
            this.items23[y]={ src: this.product_image[y].image_link, thumb: this.product_image[y].image_link };
          }
           this.items23 = this.product_image.map(item => new ImageItem({ src: item.image_link, thumb: item.image_link }));
          this.items23 = this.product_image.map(
                        item => ({ src: item.image_link, thumb: item.image_link })

          );

        /** Lightbox */

        const lightboxRef = this.gallery.ref('lightbox');
        lightboxRef.setConfig({
          imageSize: ImageSize.Cover,
          thumbPosition: ThumbnailsPosition.Bottom
        });
       // Load items into the lightbox gallery ref
        console.log(this.items23);
       lightboxRef.load(this.items23);
         
          

          this.ratings = data["ratings"];
          this.ratings_count = data["ratings_count"];
          this.reviews_count = data["reviews_count"];
          this.reviews = data["reviews"];
          this.all_ratings = data["all_ratings"];
    

          this.ratings = data["ratings"];
          console.log(this.ratings_count);
          this.ratings_count = data["ratings_count"]; 
          console.log(this.ratings);
          this.reviews_count = data["reviews_count"];
          console.log(this.reviews_count);
          this.reviews = data["reviews"];
          this.all_ratings = data["all_ratings"];
          console.log(this.all_ratings);
          this.percentmain = (this.ratings*this.reviews_count)/100;
          console.log(this.percentmain);
         for(let y=0;y<this.all_ratings.length;y++){
           if(this.all_ratings[y].ratings=='1' || this.all_ratings[y].ratings==1){
             this.percentmain1=(this.all_ratings[y].count*100)/this.reviews_count;
           }
           if(this.all_ratings[y].ratings=='2' || this.all_ratings[y].ratings==2){
             this.percentmain2=(this.all_ratings[y].count*100)/this.reviews_count;
           }
           if(this.all_ratings[y].ratings=='3' || this.all_ratings[y].ratings==3){
             this.percentmain3=(this.all_ratings[y].count*100)/this.reviews_count;
           }
           if(this.all_ratings[y].ratings=='4' || this.all_ratings[y].ratings==4){
             this.percentmain4=(this.all_ratings[y].count*100)/this.reviews_count;
           }
           if(this.all_ratings[y].ratings=='5' || this.all_ratings[y].ratings==5){
             this.percentmain5=(this.all_ratings[y].count*100)/this.reviews_count;
           }
         }
         
          this.titleService.setTitle(data["product"].meta_title);
          this.meta.addTag({ name: "author", content: "Ecomtrails" });
          this.meta.updateTag({
            name: "keyword",
            content: data["product"].meta_keywords
          });
          this.meta.updateTag({
            name: "description",
            content: data["product"].meta_description
          });
          this.meta.updateTag({
            property: "og:image",
            content: data["product_image"][0].small_thumbnail_link
            // content: "localhost:4200/assets/img/3.png"

          });
          this.meta.updateTag({ 
            property: "og:image:type", 
            content: "website" 
          });
          this.meta.updateTag({ 
            property: "og:image:width", 
            content: "300" 
          });
          this.meta.updateTag({ 
            property: "og:image:height", 
            content: "300" 
          });
          this.meta.updateTag({
            property: "og:title",
            content: data["product"].meta_title
          });
          this.meta.updateTag({ property: "og:type", content: "website" });
          // this.meta.updateTag({property : 'og:url' , content : "http://sapnadresses.ecomtrails.com"})
          this.product_groups=data['product_groups'];
           // this.productsArray=data["product_no"];
          // this.colors=data['color'];
        // let unique = this.product_groups.filter((item, i, ar) => ar.indexOf(item).color === i.color);
        let unique=this.product_groups.map(item => item.color)
  .filter((value, index, self) => self.indexOf(value) === index)

        this.product_groups_color=unique;

         this.product_groups_color = this.product_groups_color.filter(function (e) {return e != '';});

  // unique3 for color according size start 1/09/2020
        if(this.product_groups_color.length>0){
          
            for(let x=0;x<this.product_groups.length;x++){
              // start for image
              // product_groups_color_image
              //end for image
              if(this.coloring==this.product_groups[x].color){

              // if(this.product_groups_color[0]==this.product_groups[x].color){
                // if(this.product_groups[x].size=='' || this.product_groups[x].size==null){
                //    this.size_with_color.push({size:"Not Define"});
                //  //console.log(this.size_with_color);

                // }
                //   else{
                     this.size_with_color.push({size:this.product_groups[x].size});
                  // }
                
              }
             
            }
            if(this.size_with_color.length>0){
              let unique2=this.size_with_color.map(item => item.size).filter((value, index, self) => self.indexOf(value) === index);
        this.product_groups_size=unique2;
         // this.product_groups_size = this.product_groups_size.filter(function (e) {if(e == '' || e == null){e="Not Define"} return;});

            }
         
        }
        else{
            let unique2=this.product_groups.map(item => item.size).filter((value, index, self) => self.indexOf(value) === index);
        this.product_groups_size=unique2;
        // if(this.product_groups_size.length>0){
        //   for(let d=0;d<this.product_groups_size.length;d++){
        //     if(this.product_groups_size[d]=='' || this.product_groups_size==null){
        //       this.product_groups_size[d]="Not Define";
        //     }
        //   }
        //  // this.product_groups_size = this.product_groups_size.filter(function (e) {if(e == '' || e == null){e="Not Define"} return;});
        // }

        }

        // end for color according size start 1/09/2020

  //        let unique2=this.product_groups.map(item => item.size)
  // .filter((value, index, self) => self.indexOf(value) === index)

        // this.product_groups_size=unique2;
            // start for image
            if(this.product_groups_color.length>0){
          
              for(let x=0;x<this.product_groups_color.length;x++){
                // this.product_groups_color_image[x]=this.product_groups.map(item => item.color_image)
  // .filter((value, index, self) => self.indexOf(value) === index)
 let term =this.product_groups_color[x];
 //console.log(term);
var upperLetter=term.toUpperCase();
        var smallLetter=term.toLowerCase();
        for(let y=0;y<this.product_groups.length;y++){
          // console.log(this.product_groups[y]);
          // console.log(this.product_groups[y].image);
          // console.log(this.product_groups[y].image[0]);
          // console.log(this.product_groups[y].image[0].small_thumbnail_link);
       
          if(this.product_groups[y].color==term){
            this.product_groups_color_image[x]=this.product_groups[y].image[0].small_thumbnail_link;
          }
         }
        
     
   // this.product_groups_color_image[x]=this.product_groups.filter(function(tag){
   //     if(tag.color !=null){
   //       //console.log(tag);
   //        //console.log(tag.color);
   //       //console.log(tag.color_image);
   //        return (tag.color.indexOf(upperLetter)>=0 || tag.color.indexOf(smallLetter)>=0);
     
   //    }
   //    else{
   //      return 0;
   //    }
   //  });
// console.log(this.product_groups_color_image);
              }
            }
            //console.log(this.product_groups_color_image);


              // product_groups_color_image
              //end for image
        this.product_groups_size = this.product_groups_size.filter(function (e) {return e != '';});
   
          this.meta.updateTag({ 
            property: "og:type", 
            content: "website" 
          });
          this.meta.updateTag({
          property : 'og:url' , 
          content : this.main+this.router.url})
          
// start product ananlysis
this.prductAnalysis(this.comp_num_new);
// end product ananlysis
          // start similar product
          let postData = {
            brand_id: this.product.brand_id,
            category_no: this.product_category[0].category_no,
            product_no: this.product.product_no,
            comp_num: this.comp_num_new,
            user_num:'',
            access_token:''
          };
          postData.access_token = sessionStorage.getItem("access_token");
        postData.user_num = sessionStorage.getItem("user_num");
        
          this.adminservice.similar_product(postData).subscribe(data => {
            if (data["status"] == 1) {
              this.similarPro = data["result"];
            } else if (data["status"] == 0) {
            }
          });
          // end similar product
          // this.estimate_time_delivery();
        } else if (data["status"] == 10) {
           this.loader=true;
        } else if (data["status"] == 0) {
           this.loader=true;
        }
      },
      error => {
        this.loader=true;
        this.snackbar.open("Something Went wrong please try again. ", "", {
          duration: 3000
        });
      }
    );
  }
  // start 1/099/2020 for color size
   getProduct2(match) {
    let pro = { product_no: match, comp_num: this.comp_num_new };
    if(this.userC==true){
pro['user_num']=sessionStorage.getItem('user_num');
pro['access_token']=sessionStorage.getItem('access_token');
    }
    this.adminservice.viewProduct(pro).subscribe(
      data => {
       
        if (data["status"] == 1) {
          this.product = data["product"];
           this.loader=true;
           if(this.userC==true){
             this.wishlist_num=data['wishlist_num'];
             this.wishlist_check=data['wishlist_check'];
             this.cart_check=data['cart_check'];
             this.cart_inventory=data['cart_inventory'];
            
           }
          if(this.product.color !=null){
            this.coloring=this.product.color;
          }
           if(this.product.size !=null){
            this.sizing=this.product.size;
          }
          this.product_category = data["product_category"];
          this.product_rate = data["product_rate"];
          for(let scount=0;scount<this.product_rate.length;scount++){
            if(this.product_rate[scount].is_rent ==2 || this.product_rate[scount].is_rent=='2'){
              this.shipping_rate=this.product_rate[scount].rate;
              this.shipping_name=this.product_rate[scount].name;
            }
          }
          this.otpForm.get("comp_num").setValue(this.product.comp_num);
       this.otpForm.get("weight").setValue(this.product.final_weight);
//start for estimate time delivery 20/08/2020
if(this.userC==true){
      this.getAddresses();

    }
    else if( this.estimate_self==true){
      this.otpForm.get("delivery_postcode").setValue('452003');
//.//console.log(1);
         this.estimate_time_delivery();
    }
//end for estimate time delivery 20/08/2020
          this.product_tags = data["product_tags"];
          this.product_specification = data["product_specification"];


          this.product_image = data["product_image"];

          this.imageView = this.product_image[0].image_link;


          this.img = this.imageView;

        
          for(let y=0;y<this.product_image.length;y++){
            this.items23[y]={ src: this.product_image[y].image_link, thumb: this.product_image[y].image_link };
          }
          console.log(this.items23);
          
          
          this.items23 = this.product_image.map(
                        item => ({ src: item.image_link, thumb: item.image_link })

          );

        /** Lightbox */

        // Get a lightbox gallery ref
       const lightboxRef = this.gallery.ref('lightbox');
      //  Add custom gallery config to the lightbox (optional)
        lightboxRef.setConfig({
          imageSize: ImageSize.Cover,
          thumbPosition: ThumbnailsPosition.Bottom
        });
     //  Load items into the lightbox gallery ref
       lightboxRef.load(this.items23);
         
          

          this.ratings = data["ratings"];
          console.log(this.ratings_count);
          this.ratings_count = data["ratings_count"]; 
          console.log(this.ratings);
          this.reviews_count = data["reviews_count"];
          console.log(this.reviews_count);
          this.reviews = data["reviews"];
          // this.all_ratings = data["all_ratings"];
          // console.log(this.all_ratings);
          // this.percentmain = (this.ratings*this.reviews_count)/100;
          // console.log(this.percentmain);
         this.all_ratings = data["all_ratings"];
          console.log(this.all_ratings);
          this.percentmain = (this.ratings*this.reviews_count)/100;  
          console.log(this.percentmain);
         for(let y=0;y<this.all_ratings.length;y++){
           if(this.all_ratings[y].ratings=='1' || this.all_ratings[y].ratings==1){
             this.percentmain1=(this.all_ratings[y].count*100)/this.reviews_count;
           }
           if(this.all_ratings[y].ratings=='2' || this.all_ratings[y].ratings==2){
             this.percentmain2=(this.all_ratings[y].count*100)/this.reviews_count;
           }
           if(this.all_ratings[y].ratings=='3' || this.all_ratings[y].ratings==3){
             this.percentmain3=(this.all_ratings[y].count*100)/this.reviews_count;
           }
           if(this.all_ratings[y].ratings=='4' || this.all_ratings[y].ratings==4){
             this.percentmain4=(this.all_ratings[y].count*100)/this.reviews_count;
           }
           if(this.all_ratings[y].ratings=='5' || this.all_ratings[y].ratings==5){
             this.percentmain5=(this.all_ratings[y].count*100)/this.reviews_count;
           }
         }
         // start product ananlysis
this.prductAnalysis(this.comp_num_new);
// end product ananlysis

          // this.estimate_time_delivery();
        } else if (data["status"] == 10) {
           this.loader=true;
        } else if (data["status"] == 0) {
           this.loader=true;
        }
      },
      error => {
        this.loader=true;
        this.snackbar.open("Something Went wrong please try again. ", "", {
          duration: 3000
        });
      }
    );
  }
  //end 1/09/2020 for color size product
  
  ViewCalender() {
    this._location.back();
  }
count=0;
  addToCart(product) {
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
    if (this.product_rate[0].is_rent != "2") {
      postData.rate_type = this.product_rate[0].rate_type;
    } else {
      postData.rate_type = this.product_rate[1].rate_type;
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
     this.alreadyCartStock = false;
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
              if(strings2[gg] == product.product_no){
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
          if (this.product_rate[0].is_rent != "2") {
            var product_set = this.cookie.set(
              "rate_type",
              this.product_rate[0].rate_type
            );
          } else {
            var product_set = this.cookie.set(
              "rate_type",
              this.product_rate[1].rate_type
            );
          }
          // var product_set = this.cookie.set("rate_type", detail.rate[0].rate_type);
        } else if (this.cookie.get("rate_type") != null && this.cookie.get("rate_type") != '') {
          if (this.product_rate[0].is_rent != "2") {
            var newIdR = this.product_rate[0].rate_type;
          } else {
            var newIdR = this.product_rate[1].rate_type;
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
     this.adminservice.cartCount.next(this.count);
    this.snackbar.open("Added to Cart successfully", "", {
          duration: 1000
        });
             // this.adminservice.updateCartCount();
          }
        });
       
       
      }
    }
    // var detail = product;
    // var postData = {
    //   product_no: "",
    //   access_token: "",
    //   user_num: "",
    //   rate_type: "",
    //   qty: 1,
    //   comp_num: sessionStorage.getItem("comp_num_new")
    // };
    // postData.product_no = product.product_no;
    // if (this.product_rate[0].is_rent != "2") {
    //   postData.rate_type = this.product_rate[0].rate_type;
    // } else {
    //   postData.rate_type = this.product_rate[1].rate_type;
    // }
    // postData.access_token = sessionStorage.getItem("access_token");
    // postData.user_num = sessionStorage.getItem("user_num");

    // if (
    //   (sessionStorage.getItem("user_num") == "" &&
    //     sessionStorage.getItem("access_token") == "") ||
    //   (sessionStorage.getItem("user_num") == null &&
    //     sessionStorage.getItem("access_token") == null)
    // ) {
    //   this.alreadyCart = false;
    //   if (
    //     this.cookie.get("product_id2") != null &&
    //     this.cookie.get("product_id2") != ""
    //   ) {
    //     var getCookie = this.cookie.get("product_id2");
    //     var strings = getCookie.replace("%2C", ",");
    //     // let stringToSplit = "abc def ghi";
    //     var strings2 = strings.split(",");
    //     for (let gg = 0; gg < strings2.length; gg++) {
    //       strings2[gg] = strings2[gg].replace(/^\s*/, "").replace(/\s*$/, "");
    //       // myStringWithCommas.split(/\s*,\s*/).forEach(function(myString) {
    //       // });
    //       if (strings2[gg] == product.product_no) {
    //         this.alreadyCart = true;
    //       }
    //     }
    //   }
    //   if (this.alreadyCart == true) {
    //     this.snackbar.open("This product already exist in cart.", "", {
    //       duration: 1000
    //     });
    //   } else {
    //     if (this.cookie.get("product_id2") == null) {
    //       var product_set = this.cookie.set(
    //         "product_id2",
    //         product["product_no"]
    //       );
    //     } else if (this.cookie.get("product_id2") != null) {
    //       var newId = product["product_no"];

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
    //         if (this.product_rate[0].is_rent != "2") {
    //           var product_set = this.cookie.set(
    //             "rate_type",
    //             this.product_rate[0].rate_type
    //           );
    //         } else {
    //           var product_set = this.cookie.set(
    //             "rate_type",
    //             this.product_rate[1].rate_type
    //           );
    //         }
    //       } else if (this.cookie.get("rate_type") != null) {
    //         if (this.product_rate[0].is_rent != "2") {
    //           var newIdR = this.product_rate[0].rate_type;
    //         } else {
    //           var newIdR = this.product_rate[1].rate_type;
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
    //   }
    } else {
      if (product.is_cart == "True") {
        this.snackbar.open("Already Exists in Cart", "", {
          duration: 1000
        });
      } else {
        this.adminservice.addCart(postData).subscribe(data => {
          if (data["status"] == "1") {
     //          this.count = this.count+1;
     // this.adminservice.cartCount.next(this.count);
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
                         this.getProduct(this.product_no);
            // this.snackbar.open("Added to Cart", "", {
            //   duration: 1000
            // });
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

  addToWishlist(product) {
    var postData = {
      product_no: "",
      access_token: "",
      user_num: "",
      comp_num: sessionStorage.getItem("comp_num_new")
    };
    postData.product_no = product.product_no;
    postData.access_token = sessionStorage.getItem("access_token");
    postData.user_num = sessionStorage.getItem("user_num");
    if (
      postData.user_num == null ||
      postData.access_token == null ||
      postData.user_num == "" ||
      postData.access_token == ""
    ) {
      this.snackbar.open("Please Login To Add Product in Wishlist", "", {
        duration: 1000
      });
      if(this.previewFlag == '1'){
      this.router.navigate(["/Admin/preview/login"]);


      }else{
      this.router.navigate(["/login"]);


      }
      // if (this.cookie.get("product_id2W") == null) {
      //   var product_set = this.cookie.set("product_id2W", product["product_no"]);
      // }
      // else if (this.cookie.get("product_id2W") != null) {
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
            this.snackbar.open("Already Added", "", {
              duration: 1000
            });
          }
        });
      }
    }
  }

  buyNow() {
    var postData = {
      product_no: "",
      access_token: "",
      user_num: "",
      rate_type: this.registerForm2.controls.rate_type.value
    };

    postData.product_no = this.product_no;

    postData.access_token = sessionStorage.getItem("access_token");
    postData.user_num = sessionStorage.getItem("user_num");

    if (
      postData.user_num == null ||
      postData.access_token == null ||
      postData.user_num == "" ||
      postData.access_token == ""
    ) {
      this.snackbar.open("Please Login First", "", {
        duration: 1000
      });
    } else {
      this.adminservice.buy = true;
      sessionStorage.setItem("product_no2", postData.product_no);
      sessionStorage.setItem("rate_buy", postData.rate_type);
      let id_object = { product_no: postData.product_no };
      if(this.previewFlag == '1'){
        this.router.navigate(["/Admin/preview/checkout"]);
  
  
        }else{
          this.router.navigate(["/checkout"]);
  
  
        }
      
    }
  }
  // similar_product(match, meta_title) {
  //   let slug = this.product.meta_title.replace(/\s/, "-") + "-?" + match;
  //   window.scroll(0, 0);
  //   this.router
  //     .navigateByUrl("/RefreshComponent", {
  //       skipLocationChange: true
  //     })
  //     .then(() => this.router.navigate(["/product", slug]));
  // }
  similar_product(match, meta_title, slug) {
    // let slug = this.product.meta_title.replace(/\s+/g, '-') + "-?product_no=" + match  + "&marketplace=ECOMTRAILS";

    // let slug = this.product.meta_title.replace(/\s/, "-") + "-?" + match;
    window.scroll(0, 0);
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
  // rates() {
  //   if (
  //     this.registerForm2.controls.user_num.value == null ||
  //     this.registerForm2.controls.access_token.value == null ||
  //     this.registerForm2.controls.user_num.value == "" ||
  //     this.registerForm2.controls.access_token.value == ""
  //   ) {
  //     this.modalService.dismissAll("Save click");
  //     this.snackbar.open("Please Login First", "", {
  //       duration: 1000
  //     });
  //   } else {
  //     for (let k = 0; k < this.product_rate.length; k++) {
  //       if (
  //         this.product_rate[k].rate_type != "2" &&
  //         this.product_rate[k].rate_type != 2
  //       ) {
  //         this.specificCart2.push(this.product_rate[k]);
  //         this.registerForm2
  //           .get("rate_type")
  //           .setValue(this.product_rate[k].rate_type);
  //       }
  //     }
  //   }
  // }
  rating(product) {
    if (
      sessionStorage.getItem("user_num") == "" ||
      sessionStorage.getItem("user_num") == null
    ) {
      this.router.navigate(["/login"]);
    } else {
      let post = {
        user_num: sessionStorage.getItem("user_num"),
        access_token: sessionStorage.getItem("access_token"),
        comp_num: product.comp_num,
        product_no: product.product_no
      };

      this.adminservice.check_order_product(post).subscribe(data => {
        sessionStorage.setItem("comp_rating", product.comp_num);
        sessionStorage.setItem("rating", "1");
        sessionStorage.setItem("product_rating", product.product_no);
        if (data["status"] == 1) {
          if(this.previewFlag == '1'){
            this.router.navigate(["/Admin/preview/reviewrating"]);

          }else{
            this.router.navigate(["/reviewrating"]);

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
          sessionStorage.setItem("rating", "0");

         if(this.previewFlag == '1'){
            this.router.navigate(["/Admin/preview/reviewrating"]);

          }else{
            this.router.navigate(["/reviewrating"]);

          }
        }
      });
    }
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
        this.product_rate[0].rate_type != "2" &&
        this.product_rate[0].rate_type != 2
      ) {
        this.ratebuy = this.product_rate[0].rate_type;
        this.registerForm2
          .get("rate_type")
          .setValue(this.product_rate[0].rate_type);
      } else if (
        this.product_rate[1].rate_type != "2" &&
        this.product_rate[1].rate_type != 2
      ) {
        this.ratebuy = this.product_rate[1].rate_type;
        this.registerForm2
          .get("rate_type")
          .setValue(this.product_rate[1].rate_type);
      }
      for (let k = 0; k < this.product_rate.length; k++) {
        if (
          this.product_rate[k].rate_type == "2" ||
          this.product_rate[k].rate_type == 2
        ) {
          this.shipping = this.product_rate[k].rate;
          this.ratebuy = this.ratebuy + this.shipping;
          // this.registerForm2.get("rate_type").setValue(this.ratebuy);
        }
      }
      //start for buy now modify
      var postData = {
        product_no: "",
        access_token: "",
        comp_num: sessionStorage.getItem("comp_num_new"),
        user_num: "",
        rate_type: this.registerForm2.controls.rate_type.value
      };

      postData.product_no = this.registerForm2.controls.product_no.value;
      postData.access_token = sessionStorage.getItem("access_token");
      postData.user_num = sessionStorage.getItem("user_num");

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
    //end for buy now modify
  }
  getThumbnail1(thumbnail1): string {
    return this.adminservice.getThumbnail1(thumbnail1);
  }
  getGalleryImage(thumbnail1): string {
    return this.adminservice.getGalleryImage(thumbnail1);
  }
 
  Image(image) {
    this.imageView = image;
    this.img = this.imageView;
    
  }
  // view_product(){

  // }
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
  more = false;
  fetch_categories() {
    
    let new_comp=this.comp_num_new;
     if(this.ninetoys==true){
      new_comp="0";
    }
    this.adminservice
      .fetch_categories({
        user_num: sessionStorage.getItem("user_num"),
        comp_num: new_comp
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

  navigateCategory(name, id) {
    // this.router.navigate(['/category', id]);
    // let slug = name.replace(/\s/, "-") + "-?" + id;
    let slug =
      name.replace(/\s+/g, "-") +
      "-?category_no=" +
      id +
      "&marketplace=ECOMTRAILS";

    window.scroll(0, 0);
    if(this.previewFlag == '1'){
      this.router
      .navigateByUrl("/RefreshComponent", {
        skipLocationChange: true
      })
      .then(() => this.router.navigate(["/Admin/preview/shop", slug]));

    }else{
      this.router
      .navigateByUrl("/RefreshComponent", {
        skipLocationChange: true
      })
      .then(() => this.router.navigate(["/shop", slug]));

    }
    // this.router
    //   .navigateByUrl("/RefreshComponent", {
    //     skipLocationChange: true
    //   })
    //   .then(() => this.router.navigate(["/shop", slug]));
    this.megaMenu = false;
  }
  createRange(number) {
    var items: number[] = [];
    for (var i = 1; i <= number; i++) {
      items.push(i);
    }
    return items;
  }
  createRange2(number) {
    var items2: number[] = [];
    for (var i = 1; i <= number; i++) {
      items2.push(i);
    }
    return items2;
  }
  openw(){
    var url = 'https://api.whatsapp.com/send?text='+this.main+this.site;
    window.open('https://api.whatsapp.com/send?text='+this.main+this.site);
  }


getAddresses() {
    let postData = {
      user_num: sessionStorage.getItem("user_num"),
      access_token: sessionStorage.getItem("access_token")
    };
    this.adminservice.fetchAddress(postData).subscribe(data => {
      this.addresses = data["result"];
      if(this.addresses.length>0){
        this.addresses_pincode=this.addresses[0].pin_code;
              this.otpForm.get("delivery_postcode").setValue(this.addresses_pincode);

         this.estimate_time_delivery();
      }
    
    });
  }
estimate_time_delivery(){
  if(this.estimate_count==1){
    this.estimate_count=0;
  }
  else{
    this.estimate_count=1;
  }
  if(this.estimate_self==true){
    this.estimate_count=0;
  }
  //this.estimate_count=!this.estimate_count;
  if(this.estimate_count==0){
    if(this.otpForm.controls.delivery_postcode.value==''){
 let msg="Please enter pincode.";
       this.snackbar.open(msg, "", {
        duration: 3000
      });
    }
    else{
  this.adminservice.estimate_time_delivery(this.otpForm.value).subscribe(data => {
    if(data['status']==1){
      this.etd=data['etd'];
    }
    if(data['status']==0){
      let msg="Courier service not available.";
      this.snackbar.open(msg, "", {
        duration: 3000
      });
    }
      // this.etd = data["result"];
      // if(this.addresses.length>0){
      //   this.addresses_pincode=this.addresses[0].pin_code;
      // }
    
    });
}
}
}
estim(){
  this.estimate_count=1;
}
// basicLightboxExample() {
//   this.gallery.ref().load(this.items23);
// }
  
// start 13/08/2020 Priyangee for update cart

 updateCart3(cart_id,cart_inventory_id,rate_type_actual,qty,qty_stock) {
    // var qty = 1;

    if (qty < 1) {
      this.snackbar.open("Choose Valid quantity.", "", {
        duration: 3000
      });
   this.getProduct(this.product_no);
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
         
   this.getProduct(this.product_no);
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
   this.getProduct(this.product_no);
    }
  }

updateCart3minus(cart_id,cart_inventory_id,rate_type_actual,qty2,qty_stock) {
    // var qty = 1;
    var qty=parseInt(qty2)-1;
    if (qty < 1) {
      this.snackbar.open("Choose Valid quantity.", "", {
        duration: 3000
      });
   this.getProduct(this.product_no);
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
          
   this.getProduct(this.product_no);
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
   this.getProduct(this.product_no);
    }
  }
  updateCart3plus(cart_id,cart_inventory_id,rate_type_actual,qty2,qty_stock) {
    var qty=parseInt(qty2)+1;
    if (qty < 1) {
      this.snackbar.open("Choose Valid quantity.", "", {
        duration: 3000
      });
   this.getProduct(this.product_no);
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
         
   this.getProduct(this.product_no);
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
   this.getProduct(this.product_no);
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
   this.getProduct(this.product_no);
      
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
           this.getProduct(this.product_no);
            this.snackbar.open("Product from wishlist remove Successfully", "", {
              duration: 1000
            });
            if(this.previewFlag == '1'){
              // this.router
              // .navigateByUrl("/RefreshComponent", {
              //   skipLocationChange: true
              // })
              // .then(() => this.router.navigate(["/Admin/preview/wishlist"]));
              
            }else{
              // this.router
              // .navigateByUrl("/RefreshComponent", {
              //   skipLocationChange: true
              // })
              // .then(() => this.router.navigate(["/wishlist"]));

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
 //start Priyangee 21/08/2020
 compSettings2() {
    this.adminservice
      .fetch_particular_company_registry_with_sno({ comp_num: sessionStorage.getItem("comp_num_new"),s_no:16 })
      .subscribe(data => {
        if (data["status"] == 1) {
         let d = data['data'];
         let v = JSON.parse(d.value);
         if(v== "1"){
           this.ship_ask=false;
         }
         
        } else {
          
        }
      });
  }
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
  compSettings() {
    this.adminservice
      .fetch_particular_company_registry_with_sno({ comp_num: sessionStorage.getItem("comp_num_new"),s_no:6 })
      .subscribe(data => {
     


        if (data["status"] == 1) {
          // if(data['data'].length>0){
          //   for(let k=0;k<data['data'].length;k++){
              // if(data['data'].s_no==6 || data['data'][k].s_no=='6'){
                if(data['data'].value==0 || data['data'].value=='0' || data['data'].value==2 || data['data'].value=='2'){
                  this.is_estimate=true;
                }
                  if(data['data'].value==2 || data['data'].value=='2'){
                  this.is_national=true;
                }
                 if( data['data'].value=='0'){
                this.estimate_self=true;
                }
              // }
            }
         //  }
         // }
      });
  }

  //end Priyangee 21/08/2020
img_preview(){
  for(let y=0;y<this.product_image.length;y++){
            this.items23[y]={ src: this.product_image[y].image_link, thumb: this.product_image[y].image_link };
          }
          this.items23 = this.product_image.map(
                        item => ({ src: item.image_link, thumb: item.image_link })

          );

  //       /** Lightbox */

  //       // Get a lightbox gallery ref
         const lightboxRef = this.gallery.ref('lightbox');
  //       // Add custom gallery config to the lightbox (optional)
         lightboxRef.setConfig({
          imageSize: ImageSize.Cover,
          thumbPosition: ThumbnailsPosition.Bottom
        });
        // Load items into the lightbox gallery ref
        console.log(this.items23);
        // lightboxRef.load(this.items23);
         
          
}
addToWishlistWL(product) {
    var test= '<a routerLink="/login"> login </a>';
      this.snackbar.open("Please Login To Add product in Wishlist. ", 'Login', {
        duration: 5000
      }).onAction().subscribe(()=>this.router.navigateByUrl('/login'));
  }

  similar(product){
     // start similar product
          let postData = {
            brand_id: this.product.brand_id,
            category_no: this.product_category[0].category_no,
            product_no: this.product.product_no,
            comp_num: this.comp_num_new,
            user_num:'',
            access_token:''
          };
          postData.access_token = sessionStorage.getItem("access_token");
        postData.user_num = sessionStorage.getItem("user_num");
        
          this.adminservice.similar_product(postData).subscribe(data => {
            if (data["status"] == 1) {
              this.similarPro = data["result"];
            } else if (data["status"] == 0) {
            }
          });
          // end similar product
  }
 
// start 13/08/2020 Priyangee for update cart
  addToCartS(product) {
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
    if (this.product_rate[0].is_rent != "2") {
      postData.rate_type = this.product_rate[0].rate_type;
    } else {
      postData.rate_type = this.product_rate[1].rate_type;
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
     this.alreadyCartStock = false;
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
              if(strings2[gg] == product.product_no){
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
          if (this.product_rate[0].is_rent != "2") {
            var product_set = this.cookie.set(
              "rate_type",
              this.product_rate[0].rate_type
            );
          } else {
            var product_set = this.cookie.set(
              "rate_type",
              this.product_rate[1].rate_type
            );
          }
          // var product_set = this.cookie.set("rate_type", detail.rate[0].rate_type);
        } else if (this.cookie.get("rate_type") != null && this.cookie.get("rate_type") != '') {
          if (this.product_rate[0].is_rent != "2") {
            var newIdR = this.product_rate[0].rate_type;
          } else {
            var newIdR = this.product_rate[1].rate_type;
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
     this.adminservice.cartCount.next(this.count);
    this.snackbar.open("Added to Cart successfully", "", {
          duration: 1000
        });
             // this.adminservice.updateCartCount();
          }
        });
       
       
      }
    }
    // var detail = product;
    // var postData = {
    //   product_no: "",
    //   access_token: "",
    //   user_num: "",
    //   rate_type: "",
    //   qty: 1,
    //   comp_num: sessionStorage.getItem("comp_num_new")
    // };
    // postData.product_no = product.product_no;
    // if (this.product_rate[0].is_rent != "2") {
    //   postData.rate_type = this.product_rate[0].rate_type;
    // } else {
    //   postData.rate_type = this.product_rate[1].rate_type;
    // }
    // postData.access_token = sessionStorage.getItem("access_token");
    // postData.user_num = sessionStorage.getItem("user_num");

    // if (
    //   (sessionStorage.getItem("user_num") == "" &&
    //     sessionStorage.getItem("access_token") == "") ||
    //   (sessionStorage.getItem("user_num") == null &&
    //     sessionStorage.getItem("access_token") == null)
    // ) {
    //   this.alreadyCart = false;
    //   if (
    //     this.cookie.get("product_id2") != null &&
    //     this.cookie.get("product_id2") != ""
    //   ) {
    //     var getCookie = this.cookie.get("product_id2");
    //     var strings = getCookie.replace("%2C", ",");
    //     // let stringToSplit = "abc def ghi";
    //     var strings2 = strings.split(",");
    //     for (let gg = 0; gg < strings2.length; gg++) {
    //       strings2[gg] = strings2[gg].replace(/^\s*/, "").replace(/\s*$/, "");
    //       // myStringWithCommas.split(/\s*,\s*/).forEach(function(myString) {
    //       // });
    //       if (strings2[gg] == product.product_no) {
    //         this.alreadyCart = true;
    //       }
    //     }
    //   }
    //   if (this.alreadyCart == true) {
    //     this.snackbar.open("This product already exist in cart.", "", {
    //       duration: 1000
    //     });
    //   } else {
    //     if (this.cookie.get("product_id2") == null) {
    //       var product_set = this.cookie.set(
    //         "product_id2",
    //         product["product_no"]
    //       );
    //     } else if (this.cookie.get("product_id2") != null) {
    //       var newId = product["product_no"];

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
    //         if (this.product_rate[0].is_rent != "2") {
    //           var product_set = this.cookie.set(
    //             "rate_type",
    //             this.product_rate[0].rate_type
    //           );
    //         } else {
    //           var product_set = this.cookie.set(
    //             "rate_type",
    //             this.product_rate[1].rate_type
    //           );
    //         }
    //       } else if (this.cookie.get("rate_type") != null) {
    //         if (this.product_rate[0].is_rent != "2") {
    //           var newIdR = this.product_rate[0].rate_type;
    //         } else {
    //           var newIdR = this.product_rate[1].rate_type;
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
    //   }
    } else {
      if (product.is_cart == "True") {
        this.snackbar.open("Already Exists in Cart", "", {
          duration: 1000
        });
      } else {
        this.adminservice.addCart(postData).subscribe(data => {
          if (data["status"] == "1") {
     //          this.count = this.count+1;
     // this.adminservice.cartCount.next(this.count);
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
                         this.similar(this.product_no);
            // this.snackbar.open("Added to Cart", "", {
            //   duration: 1000
            // });
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

  addToWishlistS(product) {
    var postData = {
      product_no: "",
      access_token: "",
      user_num: "",
      comp_num: sessionStorage.getItem("comp_num_new")
    };
    postData.product_no = product.product_no;
    postData.access_token = sessionStorage.getItem("access_token");
    postData.user_num = sessionStorage.getItem("user_num");
    if (
      postData.user_num == null ||
      postData.access_token == null ||
      postData.user_num == "" ||
      postData.access_token == ""
    ) {
      this.snackbar.open("Please Login To Add Product in Wishlist", "", {
        duration: 1000
      });
      if(this.previewFlag == '1'){
      this.router.navigate(["/Admin/preview/login"]);


      }else{
      this.router.navigate(["/login"]);


      }
      // if (this.cookie.get("product_id2W") == null) {
      //   var product_set = this.cookie.set("product_id2W", product["product_no"]);
      // }
      // else if (this.cookie.get("product_id2W") != null) {
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
            this.similar(this.product_no);
          } else if (data["status"] == 0) {
            this.snackbar.open("Already Added", "", {
              duration: 1000
            });
          }
        });
      }
    }
  }

  buyNowS() {
    var postData = {
      product_no: "",
      access_token: "",
      user_num: "",
      rate_type: this.registerForm2.controls.rate_type.value
    };

    postData.product_no = this.product_no;

    postData.access_token = sessionStorage.getItem("access_token");
    postData.user_num = sessionStorage.getItem("user_num");

    if (
      postData.user_num == null ||
      postData.access_token == null ||
      postData.user_num == "" ||
      postData.access_token == ""
    ) {
      this.snackbar.open("Please Login First", "", {
        duration: 1000
      });
    } else {
      this.adminservice.buy = true;
      sessionStorage.setItem("product_no2", postData.product_no);
      sessionStorage.setItem("rate_buy", postData.rate_type);
      let id_object = { product_no: postData.product_no };
      if(this.previewFlag == '1'){
        this.router.navigate(["/Admin/preview/checkout"]);
  
  
        }else{
          this.router.navigate(["/checkout"]);
  
  
        }
      
    }
  }

 updateCart3S(cart_id,cart_inventory_id,rate_type_actual,qty,qty_stock) {
    // var qty = 1;

    if (qty < 1) {
      this.snackbar.open("Choose Valid quantity.", "", {
        duration: 3000
      });
   this.similar(this.product_no);
    }
    else if(qty > parseInt(qty_stock)){
      let msg="Quantity limit exceed.";
      // let msg="only "+qty_stock+" quantity available.";
       this.snackbar.open(msg, "", {
        duration: 3000
      });
        this.similar(this.product_no);
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
         
   this.similar(this.product_no);
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
   this.similar(this.product_no);
    }
  }

updateCart3minusS(cart_id,cart_inventory_id,rate_type_actual,qty2,qty_stock) {
    // var qty = 1;
    var qty=parseInt(qty2)-1;
    if (qty < 1) {
      this.snackbar.open("Choose Valid quantity.", "", {
        duration: 3000
      });
   this.similar(this.product_no);
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
          
   this.similar(this.product_no);
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
   this.similar(this.product_no);
    }
  }
  updateCart3plusS(cart_id,cart_inventory_id,rate_type_actual,qty2,qty_stock) {
    var qty=parseInt(qty2)+1;
    if (qty < 1) {
      this.snackbar.open("Choose Valid quantity.", "", {
        duration: 3000
      });
   this.similar(this.product_no);
    }
    else if(qty > parseInt(qty_stock)){
      let msg="Quantity limit exceed.";
      // let msg="only "+qty_stock+" quantity available.";
       this.snackbar.open(msg, "", {
        duration: 3000
      });
        this.similar(this.product_no);
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
         
   this.similar(this.product_no);
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
   this.similar(this.product_no);
    }
  }

    deleteFromCartFS(id) {
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
   this.similar(this.product_no);
      
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

  deleteFromWishlistS(id) {
    
    
          var postData = { user_num: "", access_token: "", wishlist_num: "" };
          postData.user_num = sessionStorage.getItem("user_num");
          postData.access_token = sessionStorage.getItem("access_token");
          postData.wishlist_num = id;

         this.adminservice.removeFromWishlist(postData).subscribe(data => {
          if (data["status"] == "1") {
           this.similar(this.product_no);
            this.snackbar.open("Product from wishlist remove Successfully", "", {
              duration: 1000
            });
            if(this.previewFlag == '1'){
              // this.router
              // .navigateByUrl("/RefreshComponent", {
              //   skipLocationChange: true
              // })
              // .then(() => this.router.navigate(["/Admin/preview/wishlist"]));
              
            }else{
              // this.router
              // .navigateByUrl("/RefreshComponent", {
              //   skipLocationChange: true
              // })
              // .then(() => this.router.navigate(["/wishlist"]));

            }
          
            
          } else if (data["status"] == "10") {
              } else {
            
            this.snackbar.open("Something went wrong..!", "", {
              duration: 5000
            });
           
          }
        });
         
       
       
  }


  ratesS(product) {
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
        this.product_rate[0].rate_type != "2" &&
        this.product_rate[0].rate_type != 2
      ) {
        this.ratebuy = this.product_rate[0].rate_type;
        this.registerForm2
          .get("rate_type")
          .setValue(this.product_rate[0].rate_type);
      } else if (
        this.product_rate[1].rate_type != "2" &&
        this.product_rate[1].rate_type != 2
      ) {
        this.ratebuy = this.product_rate[1].rate_type;
        this.registerForm2
          .get("rate_type")
          .setValue(this.product_rate[1].rate_type);
      }
      for (let k = 0; k < this.product_rate.length; k++) {
        if (
          this.product_rate[k].rate_type == "2" ||
          this.product_rate[k].rate_type == 2
        ) {
          this.shipping = this.product_rate[k].rate;
          this.ratebuy = this.ratebuy + this.shipping;
          // this.registerForm2.get("rate_type").setValue(this.ratebuy);
        }
      }
      //start for buy now modify
      var postData = {
        product_no: "",
        access_token: "",
        comp_num: sessionStorage.getItem("comp_num_new"),
        user_num: "",
        rate_type: this.registerForm2.controls.rate_type.value
      };

      postData.product_no = this.registerForm2.controls.product_no.value;
      postData.access_token = sessionStorage.getItem("access_token");
      postData.user_num = sessionStorage.getItem("user_num");

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
    //end for buy now modify
  }

//end for update cart 13/08/2020 Priyangee
 // start for product analysis

  prductAnalysis(dd) {
    let pro=this.product_no;
     pro= pro.replace("?marketplace=ECOMTRAILS", "");
   console.log(pro);
     this.adminservice
      .insert_product_visit_log({ comp_num: dd,user_num:sessionStorage.getItem("user_num"),product_no:pro})
      .subscribe(data => {
     


        if (data["status"] == 1) {
           
        } else {
        }
           
      });
  }






public imagePath;
  imgURL: any;
  public message: string;

  enableZoom: Boolean = true;
  previewImageSrc: any;
  zoomImageSrc: any;

  
    

  preview(files) {
    if (files.length === 0) return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      //this.imgURL = reader.result;
      this.previewImageSrc = reader.result;
      this.zoomImageSrc = reader.result;
    };
}
}
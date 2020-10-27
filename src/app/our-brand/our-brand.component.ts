import { Component, OnInit, ViewChild, ElementRef,HostListener } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  FormControl
} from "@angular/forms";
import { first } from "rxjs/operators";
import { RoarclubserviceService } from "../roarclubservice.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTableDataSource } from "@angular/material/table";
@Component({
  selector: 'app-our-brand',
  templateUrl: './our-brand.component.html',
  styleUrls: ['./our-brand.component.css']
})
export class OurBrandComponent implements OnInit {

  isShow: boolean;
  topPosToStartShowing = 100;


  comp_num_new  = sessionStorage.getItem('comp_num_new');
  public access_token = sessionStorage.getItem("access_token");
  public user_num = sessionStorage.getItem("user_num");
  brands;
  previewFlag = sessionStorage.getItem('previewFlag');
  
  constructor(private snackbar: MatSnackBar,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private adminService: RoarclubserviceService,
    ) { }
 
 ecomtrails2 = true;
  ecomtrails = false;
  ninetoys = false;
  serverlink;
  host_name;
  ngOnInit() {
    let l = location.origin;
    var c = l.split("//");
    this.host_name = c[1];
    let serv = this.host_name;
    var s = serv.split(".");
    this.serverlink = s[1];
     this.adminService
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
    this.adminService
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
       this.adminService
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
  }
  getbrandImage(image):string{
    return this.adminService.getbrandImage(image);
  }
 

  navigateCategory(name, id) {
    // this.router.navigate(['/category', id]);
    // let slug = name.replace(/\s/, "-") + "-?" + id;
      let slug = name.replace(/\s+/g, '-') + "-?brand_id=" + id  + "&marketplace=ECOMTRAILS";
  
     window.scroll(0,0);
     if(this.previewFlag == '1'){
      this.router
      .navigateByUrl("/RefreshComponent", {
        skipLocationChange: true
      })
      .then(() => this.router.navigate(["/Admin/preview/category-page", "brand", slug]));

    }else{
      this.router
      .navigateByUrl("/RefreshComponent", {
        skipLocationChange: true
      })
      .then(() => this.router.navigate(["/category-page", "brand", slug]));
      
    }
    // this.router.navigateByUrl('/RefreshComponent', {
    //   skipLocationChange: true
    // }).then(() =>
    //   this.router.navigate(["/shop","brand", slug]));
    this.megaMenu = false;
  }
  megaMenu = false;

}


import { Component, OnInit, HostListener, ElementRef } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { RoarclubserviceService } from "../roarclubservice.service";
import {MatSnackBar} from  '@angular/material/snack-bar'
import { CookieService } from "ngx-cookie-service";
import { Location } from "@angular/common";
@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.css"]
})
export class FooterComponent implements OnInit {
  comp_num_new = sessionStorage.getItem("comp_num_new");
  user_num = sessionStorage.getItem("user_num");
  access_token = sessionStorage.getItem("access_token");
 
  constructor(
    private adminservice: RoarclubserviceService,
    private router: Router,
    public snackbar: MatSnackBar,

    public location: Location,
    private cookie: CookieService
  ) {}
  public is_logged_in = false;
  public is_logged_out = false;
  
  host_name;
  compd;
  buis_update=false;
  cust_reg_enable=false;

  ngOnInit() {
    let l = location.origin;
    var c = l.split("//");

    this.host_name = c[1];

    
      if((this.host_name == "vendor.ecomtrails.com"  && sessionStorage.getItem('previewFlag') == '1' ) || (this.host_name == "signup.ecomtrails.com"  && sessionStorage.getItem('previewFlag') == '1' ) ){
        this.comp_num_new = sessionStorage.getItem('comp_num_new');
        this.medialinks(this.comp_num_new);
        this.basicCompany(this.comp_num_new);
      
      }else{
        this.adminservice
        .hostlink({ host_name: this.host_name })
        .subscribe(data => {
          if (data["status"] == 1) {
            if(data['result']['is_active']=='Y'){
              sessionStorage.setItem("comp_num_new", data["result"].comp_num);
              this.comp_num_new = data["result"].comp_num;
              this.medialinks(this.comp_num_new);
              this.basicCompany(this.comp_num_new);
            } else {

            }

          }else{

          }
           
        });

      }
      if (!this.user_num && !this.access_token) {
        this.is_logged_out = true;
        this.is_logged_in = false;
      } else {
        this.is_logged_in = true;
        this.is_logged_out = false;
       
      }
  // this.compSettingsCustReg(this.comp_num_new);
  this.compSettingsCustReg();
      this.fetch_customer();
  }
  data;
  medialinks(dd) {
    this.adminservice
      .fetch_media_links({
        comp_num: dd
      })
      .subscribe(data => {
        if (data["status"] == 1) {
          this.data = data["data"].value;
          // this.data = JSON.parse(d.value);

        } else if (data["status"] == 0) {
        }
      });
  }
  basicCompany(dd) {
    this.adminservice
      .getCompnyBasicDetail({
        comp_num: dd
      })
      .subscribe(data => {
        if (data["status"] == 1) {
          this.compd = data["data"];
        } else if (data["status"] == 0) {
        }
      });
  }



  
  compSettingsCustReg() {
    this.adminservice
      .fetch_particular_company_registry_with_sno({ comp_num: this.comp_num_new,s_no:21})
      .subscribe(data => {
     


        if (data["status"] == 1) {
          // if(data['data'].length>0){
          //   for(let k=0;k<data['data'].length;k++){
              // if(data['data'][k].s_no==14 || data['data'][k].s_no=='14'){
                if(data['data'].value==1 || data['data'].value=='1'){
                  this.cust_reg_enable=true;
                }
              // }
          //   }
          // }
         }
      });
  }

fetch_customer(){
                if(this.is_logged_in==true){
      let postData = {
        user_num:this.user_num,
        access_token:this.access_token,
        comp_num: sessionStorage.getItem('comp_num_new')
      };

      this.adminservice.fetch_customer_registration(postData).subscribe(
        data => {
          if (data["status"] == 1) {
          
          
if(data["result"].buisness_no!='0' && data["result"]!=null && data["result"].buisness_no!=null && data["result"].buisness_no!='null' && data["result"].buisness_no!='0'){
  this.buis_update=true;
             }
             else{
             
 
 
             }
          } else {

           
          }
        },
        error => {

         
        }
      );
    }
  }

}

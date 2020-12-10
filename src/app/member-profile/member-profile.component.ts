

import { Component, OnInit } from '@angular/core';
import { RoarclubserviceService } from "../roarclubservice.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AlertService, AuthenticationService } from '../_services';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Location } from "@angular/common";
import { first } from "rxjs/operators";
import { CookieService } from "ngx-cookie-service";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";

@Component({
  selector: 'app-member-profile',
  templateUrl: './member-profile.component.html',
  styleUrls: ['./member-profile.component.css']
})
export class MemberProfileComponent implements OnInit {
buis_update;
allResult;
loading=true;
buisness_details;
address_details;
updateAddres;
bank_details;
referral_ask=false;
user_num = sessionStorage.getItem("user_num");
  access_token = sessionStorage.getItem("access_token");
  comp_num = sessionStorage.getItem("comp_num_new");

  constructor(
private adminService: RoarclubserviceService,
    private snackbar: MatSnackBar,
    private router: Router,
      private location :Location,
    private authenticationService: AuthenticationService,

  	) { }

  ngOnInit(): void {
    this.fetch_customer();
    this.compSettingsReferralAsk(this.comp_num);
  }

customer_update(){
	this.router.navigate(["/member-registration-form"]);
  
}

fetch_customer(){
		this.loading=false;
      let postData = {
      	user_num:this.user_num,
      	access_token:this.access_token,
        comp_num:this.comp_num
      };
      console.log(postData);

      this.adminService.fetch_customer_registration(postData).subscribe(
        data => {
          if (data["status"] == 1) {
             this.loading=true;




            this.allResult = data["result"];
 console.log(this.allResult);
           
if(this.allResult.buisness_no!='0' && this.allResult!=null){
	this.buis_update=true;
	 sessionStorage.setItem("buisness_no",this.allResult.buisness_no);
         

           
             this.buisness_details=this.allResult['buisness_details'];
			 this.updateAddres=this.buisness_details['address'];
            console.log(this.updateAddres);
console.log(this.buisness_details);
console.log(this.buisness_details.gst);
if(this.buisness_details['bank_details']!=null){
this.bank_details=this.buisness_details['bank_details'];
  
             }
}
             
          } else {
          	this.loading=true;

           
          }
        },
        error => {
        	this.loading=true;

         
        }
      );
    }
    bankU(){
        this.router.navigate(["/member-bank-update"]);

    }
    compSettingsReferralAsk(dd) {
      this.adminService
       .fetch_particular_company_registry_with_sno({ comp_num: dd,s_no:25})
       .subscribe(data => {
      
  
  
         if (data["status"] == 1) {
            let d = data['data'];
            let v = d.value;
          if(v== '1' || v== '2'){
            this.referral_ask=true;
          }
          else{
            this.referral_ask==false;
          }
        
         } else {
          this.referral_ask==false;
         }
  
       });
   }
}

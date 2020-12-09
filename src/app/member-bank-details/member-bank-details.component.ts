
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

import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
  FormGroupDirective,
  NgForm,
  AbstractControl,
  FormArray
} from "@angular/forms";

@Component({
  selector: 'app-member-bank-details',
  templateUrl: './member-bank-details.component.html',
  styleUrls: ['./member-bank-details.component.css']
})
export class MemberBankDetailsComponent implements OnInit {
 bankForm:FormGroup;
 // updateAddres;
 allResult;
  user_num = sessionStorage.getItem("user_num");
  access_token = sessionStorage.getItem("access_token");
  comp_num = sessionStorage.getItem("comp_num_new");
 loading=false;
 buis_update=false;
 state_fetch;
  city_fetch;
  country_fetch;
buisness_details;
address_details;
bank_details;
buisness_no;
bank_detail_id;
country;
bank_update=false;

  state_fetch2;
  city_fetch2;
  country_fetch2;
    minDate = new Date();
updateAddres;
valid_toU;

  constructor(
private adminService: RoarclubserviceService,
    private fb: FormBuilder, 
    private snackbar: MatSnackBar,
    private router: Router,
      private location :Location,
    private authenticationService: AuthenticationService,

  	) { }

  ngOnInit(): void {
  	this.loading=true;
 this.bankForm = this.fb.group({
   // comp_num:this.comp_num,
  	 user_num: this.user_num,
      access_token: this.access_token,
      comp_num: this.comp_num,
      account_no: [""],
      ifsc: [""],
      account_name: [""],
      bank_name: [""],
      bank_address: [""],
      
      upi: [""],
      buisness_no: sessionStorage.getItem("buisness_no"),
      bank_detail_no:this.bank_detail_id,
    });
 if(sessionStorage.getItem("buisness_no") && sessionStorage.getItem("buisness_no")!='0' && sessionStorage.getItem("buisness_no")!=null){
  		this.buis_update=true;
  		
  	}
  	this.fetch_customer();
  
  }



fetch_customer(){
		this.loading=false;
      let postData = {
      	user_num:this.user_num,
        comp_num:this.comp_num,
      	access_token:this.access_token,
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
	  this.buisness_details=this.allResult['buisness_details'];
			
	this.bankForm.get("buisness_no").setValue(this.buisness_details.buisness_no);

	 sessionStorage.setItem("buisness_no",this.allResult.buisness_no);
         

           
            this.updateAddres=this.buisness_details['address'];
			 this.bank_details=this.buisness_details['bank_details'];
			 if(this.bank_details!=null){
			 	this.bank_detail_id=this.bank_details.bank_detail_no;
			 this.bank_update=true;
			 
           

  this.bankForm.get("account_no").setValue(this.bank_details.account_no);
  this.bankForm.get("bank_detail_no").setValue(this.bank_details.bank_detail_no);
          
 
            this.bankForm.get("account_name").setValue(this.bank_details.account_name);
            this.bankForm.get("upi").setValue(this.bank_details.upi);
            this.bankForm.get("ifsc").setValue(this.bank_details.ifsc);
             // this.bankForm.get("line2").setValue(this.updateAddres.line2);
            
             this.bankForm.get("bank_name").setValue(this.bank_details.bank_name);
            this.bankForm.get("bank_address").setValue(this.bank_details.bank_address);
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


//start ifsc api
      get_ifsc(data){
         let postData = {ifsc:data}
         if(data != null && data != ''){
              this.adminService.ifsc_api(postData).subscribe(data => {
              if(data['status']==1){
                // this.countries = data['result'];
                 // this.bankForm.get('ifsc').setValue(this.bankInfo.ifsc);
                        this.bankForm.get('bank_name').setValue(data['result']['BANK']);
                      
                        this.bankForm.get('bank_address').setValue(data['result']['BRANCH']);
                     
              }
              else{
                 this.bankForm.get('bank_name').setValue('');
                      
                        this.bankForm.get('bank_address').setValue('');
                     
              }
                
              }); 
         }
  
      }       
              
             
   //end ifsc API


   add(){
this.loading=false;

console.log(this.bankForm);
if (this.bankForm.invalid) {
	this.loading=true;

      alert("* fields are required.");
      // return;
    } 


    else {
let postData = this.bankForm.value;
      console.log(postData);

      this.adminService.insert_bank_information(postData).subscribe(
        data => {
          if (data["status"] == 1) {
             this.loading=true;
           this.snackbar.open("Information saved Successfully ", "", {
              duration: 3000,
              horizontalPosition: "center"
            });
            
              this.router
                .navigateByUrl("/", {
                  skipLocationChange: true
                })
                .then(() => this.router.navigate(["/my-account/member-profile"]));
            
          } else {
          	this.loading=true;

            this.snackbar.open("Unable to save ,Please try again.", "", {
              duration: 3000
            });
          }
        },
        error => {
        	this.loading=true;

          this.snackbar.open("Something Went wrong please try again. ", "", {
            duration: 3000
          });
        }
      );
    }

}



   update(){
this.loading=false;

console.log(this.bankForm);
if (this.bankForm.invalid) {
	this.loading=true;

      alert("* fields are required.");
      // return;
    } 


    else {
let postData = this.bankForm.value;
      console.log(postData);

      this.adminService.update_bank_information(postData).subscribe(
        data => {
          if (data["status"] == 1) {
             this.loading=true;
           this.snackbar.open("Information saved Successfully ", "", {
              duration: 3000,
              horizontalPosition: "center"
            });
            
              this.router
                .navigateByUrl("/", {
                  skipLocationChange: true
                })
                .then(() => this.router.navigate(["/my-account/member-profile"]));
            
          } else {
          	this.loading=true;

            this.snackbar.open("Unable to save ,Please try again.", "", {
              duration: 3000
            });
          }
        },
        error => {
        	this.loading=true;

          this.snackbar.open("Something Went wrong please try again. ", "", {
            duration: 3000
          });
        }
      );
    }

}
}

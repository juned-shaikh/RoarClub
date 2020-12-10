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
  selector: 'app-member-registration-details',
  templateUrl: './member-registration-details.component.html',
  styleUrls: ['./member-registration-details.component.css']
})
export class MemberRegistrationDetailsComponent implements OnInit {
 form:FormGroup;
 referral_compulsory=false;
 otpForm: FormGroup;
 pan_i=null;
 address_i=null;
 profile_i=null;
 referral_ask=false;
 buisness_verify=false;
 imgHeight=0;
 pan_necessory='1';
 refer;
 skip_refer=false;
    image : File;
    address_image:File;
    pan_image:File;
contact_disable=true;
email_disable=true;
  imgWidth=0;
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
country;

  state_fetch2;
  city_fetch2;
  country_fetch2;
    minDate = new Date();
updateAddres;
valid_toU;
otpgeneration = false;
  verify = false;
  referral_verification=false;
  fileData: File = null;

  address_fileData: File = null;
  pan_fileData: File = null;
  previewUrl:any = null;
  previewUrl2:any=null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
phone;
  constructor(
 private adminService: RoarclubserviceService,
    private fb: FormBuilder, 
    private snackbar: MatSnackBar,
    private router: Router,
    private cookie: CookieService,
      private location :Location,
    private authenticationService: AuthenticationService,

  	) { }

  ngOnInit(){
  	console.log(1);
  this.phone = new RegExp(/^(\+\d{1,3}[- ]?)?\d{10}$/);

  	let dte=this.minDate;
 dte.setFullYear(dte.getFullYear() - 18);

  	this.loading=true;
 this.form = this.fb.group({
   // comp_num:this.comp_num,
  	 user_num: this.user_num,
      access_token: this.access_token,
      dob: ["", Validators.required],
     comp_num:this.comp_num,
      gender: ["male"],
      line1: ["" , Validators.required],
      line2: [""],
      landmark: [""],
      pin_code: [""],
      city_id: [""],

      email_disable: [{ value: "", disabled: true }],
      contact_disable: [{ value: "", disabled: true }],
      
      country: [{ value: "", disabled: true }],
      state: [{ value: "", disabled: true }],
      city: [{ value: "", disabled: true }],
      country_id: [""],
      state_id: [""],
      contact_no: ["",[ Validators.maxLength(10),Validators.minLength(10)
          ]],
      email: ["",[
      Validators.pattern("^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")
      ]],
      receiver_name: [""],
      referral_code:[""],
       receiver_last_name: [""],
        image: [""],
        address_image:[""],
        pan_image:[''],
       registration_type:[''],
      gst:["",
          [
            Validators.minLength(10),
            Validators.maxLength(17),
             Validators.pattern("^[0-9]{2}[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}[1-9A-Za-z]{1}[Zz][0-9A-Za-z]{1}$")
        
          ]],
      pan: [
          "",
          [
            Validators.minLength(10),
            Validators.maxLength(10),
            Validators.pattern("^[A-Za-z]{5,5}[0-9]{4,4}[A-Za-z]{1,1}$")
          ]
        ],
      tan:["", [
            Validators.minLength(10),
            Validators.maxLength(10),
            Validators.pattern("^[A-Za-z]{4,4}[0-9]{5,5}[A-Za-z]{1,1}$")
          ]],
       buisness_name:[''],
        customer_reg_num: [""],
      otp: [""],
      subject:["Referral Code"],
    
      
    });
 if(sessionStorage.getItem("buisness_no") && sessionStorage.getItem("buisness_no")!='0' && sessionStorage.getItem("buisness_no")!=null){
  		this.buis_update=true;
  		
  	}



    this.otpForm = this.fb.group({
      customer_reg_num: [""],
      otp: [""],
      subject:["Referral Code"],
      comp_num:this.comp_num
    });
    this.compSettings(this.comp_num);
    this.compSettingsMemberPan(this.comp_num);
  	this.fetch_customer();
  }
add_customer_registration(){
this.loading=false;

console.log(this.form);
if (this.form.invalid) {
	this.loading=true;
      alert("* fields are required.");
      // return;
    } 
    if (this.pan_necessory=='1' && (this.form.controls.pan.value==null || this.form.controls.pan.value=='') ) {
      this.loading=true;
          alert("PAN field is required.");
          // return;
        } 
    else if(  !this.phone.test(this.form.controls.contact_no.value)
   ){
        this.loading=true;
      alert('Mobile no. must be 10 digits.');

    }
   else if( this.form.controls.state.value=="" ||

          this.form.controls.city.value=="" || this.form.controls.country.value==""
){
    	this.loading=true;

      alert("Please fill correct pincode.");

    }

     else if(this.pan_necessory=='1' && this.pan_i==null && !this.pan_image){
       this.loading=true;
        alert("Please upload PAN Document.");
    }
    else if( this.address_i==null && !this.address_image){
       this.loading=true;
       alert("Please upload Address Proof Document.");
    }
    else if( this.profile_i==null && !this.image){
    this.loading=true;
        alert("Please upload Profile Image.");
    
    }

//      else if( this.form.controls.buisness_name.value!="" &&

//           this.form.controls.buisness_name.value!=null && (this.form.controls.registration_type.value=="" || this.form.controls.registration_type.value==null)
// ){
//     	this.loading=true;

//       alert("Please choose Registration Type Option.");

//     }

    else {

    	var event2= this.form.controls.dob.value;
     var day2=event2.getDate();
  var month2=event2.getMonth()+1;
  var year2 =event2.getFullYear();
  var fullD2=year2+'-'+month2+'-'+day2;
 this.form.get('dob').setValue(fullD2);
      let postData = this.form.value;
      console.log(postData);

      // start 
  let data2 = this.form.value;
     
       const formData2 = new FormData();
 
  if (this.image) {
        formData2.append('image', this.image, this.image.name);        
      }

        if (this.address_image) {
        formData2.append('address_image', this.address_image, this.address_image.name);        
      }
  if (this.pan_image) {
        formData2.append('pan_image', this.pan_image, this.pan_image.name);        
      }

      if(this.referral_verification==true && this.f.referral_code.value!=null && this.f.referral_code.value!=''){
         formData2.append('referral_code', this.f.referral_code.value);
     
      }
      else{
         formData2.append('referral_code', '');
     
      }
      formData2.append('comp_num', this.comp_num);
     
      formData2.append('receiver_name', this.f.receiver_name.value);
      formData2.append('receiver_last_name', this.f.receiver_last_name.value);
      formData2.append('user_num', this.user_num);
      formData2.append('access_token', this.access_token);
      formData2.append('dob', this.f.dob.value);
  


   formData2.append('gender', this.f.gender.value);
      formData2.append('line1', this.f.line1.value);
      formData2.append('line2', this.f.line2.value);
      formData2.append('landmark', this.f.landmark.value);
      formData2.append('city_id', this.f.city_id.value);
  

   formData2.append('state_id', this.f.state_id.value);
      formData2.append('country_id', this.f.country_id.value);
      formData2.append('pin_code', this.f.pin_code.value);
      formData2.append('email', this.f.email.value);
      formData2.append('contact_no', this.f.contact_no.value);
  
if (this.form.controls.registration_type.value=="" || this.form.controls.registration_type.value==null){

}
else{
  formData2.append('registration_type', this.f.registration_type.value);
 }    
  formData2.append('gst', this.f.gst.value);
      formData2.append('pan', this.f.pan.value);
      formData2.append('tan', this.f.tan.value);
      formData2.append('buisness_name', this.f.buisness_name.value);
  // formData2.append('buisness_no', this.f.buisness_no.value);
  
      //end
console.log(formData2);
      this.adminService.add_customer_registration(formData2).subscribe(
        data => {
          if (data["status"] == 1) {
             this.loading=true;
 sessionStorage.setItem("buisness_no", data["buisness_no"]);
            sessionStorage.setItem("usertype_id", '6');
           
            this.snackbar.open("Information  added Successfully ", "", {
              duration: 3000,
              horizontalPosition: "center"
            });
            localStorage.setItem("flag", "1");
            // sessionStorage.setItem("user_num", data["user_num"]);
            // sessionStorage.setItem("access_token", data["access_token"]);
            // sessionStorage.setItem("jwtoken", data["jwtoken"]);
            // sessionStorage.setItem("usertype_id", data["usertype_id"]);
            // sessionStorage.setItem("email", data["email"]);
            // sessionStorage.setItem("mobile", data["mobile"]);
            // // return;

            // this.authenticationService.add_customer_registrationuser2(postData){
            // };
     
        
          // sessionStorage.setItem("tokenObject", postData);
    

            // location.reload();
            // this.ngOnInit();
            if(this.cookie.get('buy_now_product')=="true"){
               this.adminService.buy = true;
                              console.log(1);

               this.router.navigate(["/checkout"]);
            }
            else{

              if(sessionStorage.getItem('routes') && sessionStorage.getItem('routes')!=null){
                this.router.navigate([sessionStorage.getItem('routes')]);
               
              }
              else{
                this.router.navigate(["/"]);
              }
            }
            // window.location.reload();
            
              this.router
                .navigateByUrl("/RefreshComponent", {
                  skipLocationChange: true
                })
                .then(() => this.router.navigate(["/"]));
            
          } else {
          	this.loading=true;

            this.snackbar.open("Unable to add ,Please try again.", "", {
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


  pincode_api(data) {
    let postData = { pin_code: data };
    this.adminService.pincode_api(postData).subscribe(data => {
      if (data["status"] == 1) {
        if (data["result"]["PostOffice"] != null) {
          this.country_fetch = data["result"]["PostOffice"][0]["Country"];
          this.state_fetch = data["result"]["PostOffice"][0]["State"];
          this.city_fetch = data["result"]["PostOffice"][0]["District"];
          this.form.get("state").setValue(this.state_fetch);
this.form.get("country").setValue(this.country_fetch);

          this.form.get("city").setValue(this.city_fetch);

          this.adminService
            .pincode_country_state_city_api({
              Country: this.country_fetch,
              State: this.state_fetch,
              District: this.city_fetch
            })
            .subscribe(data => {
              if (data["status"] == 1) {
                this.form
                  .get("state_id")
                  .setValue(data["state"]["state_id"]);
                this.form
                  .get("country_id")
                  .setValue(data["country"]["country_id"]);
                this.form
                  .get("city_id")
                  .setValue(data["city"]["city_id"]);
              }
            });
        } else {
          this.form.get("state").setValue("");

          this.form.get("city").setValue("");
           this.form.get("country").setValue("");

          this.form.get("state_id").setValue("");
          this.form.get("country_id").setValue("");
          this.form.get("city_id").setValue("");
        }
        // this.countries = data['result'];
        // this.bankForm.get('ifsc').setValue(this.bankInfo.ifsc);
      }
    });
  }

  addEvent(event: MatDatepickerInputEvent<Date>){
    this.form.get('dob').setValue( event.value);
          
}

update_customer_registration(){
	this.loading=false;
  this.form.addControl('buisness_no',new FormControl('buisness_no'));
      this.form.get('buisness_no').setValue(sessionStorage.getItem("buisness_no"));     
console.log(this.form);
if (this.form.invalid) {

      alert("* fields are required.");
      // return;
    } 
    if (this.pan_necessory=='1' && (this.form.controls.pan.value==null || this.form.controls.pan.value=='') ) {
      this.loading=true;
          alert("PAN field is required.");
          // return;
        } 
     else if(  !this.phone.test(this.form.controls.contact_no.value)
   ){
      alert('Mobile no. must be 10 digits.');

    }
    else if( this.form.controls.state.value=="" ||

          this.form.controls.city.value=="" || this.form.controls.country.value==""
){
    	this.loading=true;

      alert("Please fill correct pincode.");

    }
     else if(this.pan_necessory=='1' && this.pan_i==null && !this.pan_image){
       this.loading=true;
        alert("Please upload PAN Document.");
    }
    else if( this.address_i==null && !this.address_image){
       this.loading=true;
       alert("Please upload Address Proof Document.");
    }
    else if( this.profile_i==null && !this.image){
    this.loading=true;
        alert("Please upload Profile Image.");
    
    }




//      else if( this.form.controls.buisness_name.value!="" &&

//           this.form.controls.buisness_name.value!=null && (this.form.controls.registration_type.value=="" || this.form.controls.registration_type.value==null)
// ){
//     	this.loading=true;

//       alert("Please choose Registration Type Option.");

//     }

    else {
var fullD2;
    	var event2= this.form.controls.dob.value;
    	console.log(event2);
    	 if(event2!=this.valid_toU){
     var day2=event2.getDate();
  var month2=event2.getMonth()+1;
  var year2 =event2.getFullYear();
   fullD2=year2+'-'+month2+'-'+day2;
   }
     else{
        fullD2= this.form.controls.dob.value;
       console.log(fullD2);
       // this.couponFormU.get('valid_to').setValue(fullD2);
     }
  
 this.form.get('dob').setValue(fullD2);
      let postData = this.form.value;
      console.log(postData);

      // start 
  let data2 = this.form.value;
     
       const formData2 = new FormData();
 
  if (this.image) {
        formData2.append('image', this.image, this.image.name);        
      }
       if (this.address_image) {
        formData2.append('address_image', this.address_image, this.address_image.name);        
      }
  if (this.pan_image) {
        formData2.append('pan_image', this.pan_image, this.pan_image.name);        
      }

     
      formData2.append('receiver_name', this.f.receiver_name.value);
      formData2.append('receiver_last_name', this.f.receiver_last_name.value);
      formData2.append('user_num', this.user_num);
      formData2.append('access_token', this.access_token);
      formData2.append('dob', this.f.dob.value);
  


   formData2.append('gender', this.f.gender.value);
      formData2.append('line1', this.f.line1.value);
      formData2.append('line2', this.f.line2.value);
      formData2.append('landmark', this.f.landmark.value);
      formData2.append('city_id', this.f.city_id.value);
  

   formData2.append('state_id', this.f.state_id.value);
      formData2.append('country_id', this.f.country_id.value);
      formData2.append('pin_code', this.f.pin_code.value);
      formData2.append('email', this.f.email.value);
      formData2.append('contact_no', this.f.contact_no.value);
      // if(this.f.buisness_name.value!='' && this.f.buisness_name.value!=null){
          if (this.form.controls.registration_type.value=="" || this.form.controls.registration_type.value==null){

        }
        else{
          formData2.append('registration_type', this.f.registration_type.value);
         }
    // }

  // formData2.append('registration_type', this.f.registration_type.value);
  // if(this.f.registration_type.value=='1' || this.f.registration_type.value=='3'){
      formData2.append('gst', this.f.gst.value);
    // }
      formData2.append('pan', this.f.pan.value);
      formData2.append('tan', this.f.tan.value);
      formData2.append('buisness_name', this.f.buisness_name.value);
  formData2.append('buisness_no', this.f.buisness_no.value);
  
      //end
       formData2.append('comp_num', this.comp_num);
     
      console.log(formData2);
      this.adminService.update_customer_registration(formData2).subscribe(

      // this.adminService.update_customer_registration(form).subscribe(
        data => {
          this.loading=true;

          if (data["status"] == 1) {
             this.loading=true;
 sessionStorage.setItem("buisness_no", data["buisness_no"]);
            sessionStorage.setItem("usertype_id", '6');
           
            this.snackbar.open("Information  saved Successfully ", "", {
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

            this.snackbar.open("Unable to update ,Please try again.", "", {
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

if(this.allResult.buisness_no!='0' && this.allResult!=null && this.allResult.buisness_no!=null && this.allResult.buisness_no!='null' && this.allResult.buisness_no!='0'){
	this.buis_update=true;
	 sessionStorage.setItem("buisness_no",this.allResult.buisness_no);
         this.buisness_verify=this.allResult.buisness_verify;

           
             this.buisness_details=this.allResult['buisness_details'];
			 this.updateAddres=this.buisness_details['address'];
            console.log(this.updateAddres);
console.log(this.buisness_details);
console.log(this.buisness_details.gst);
  this.form.get("buisness_name").setValue(this.buisness_details.buisness_name);
      this.form.get("registration_type").setValue(this.buisness_details.registration_type);

            this.form.get("gst").setValue(this.buisness_details.gst);
            this.form.get("pan").setValue(this.updateAddres.pan);
            this.form.get("tan").setValue(this.buisness_details.tan);
             // this.form.get("line2").setValue(this.updateAddres.line2);
            
            this.form
              .get("receiver_name")
              .setValue(this.updateAddres.receiver_name);
            this.form.get("line1").setValue(this.updateAddres.line1);
            this.form.get("line2").setValue(this.updateAddres.line2);
             if(this.updateAddres.address_proof!=null && this.updateAddres.address_proof!='default.png'){
             
                this.address_i=this.updateAddres.address_proof;
             }
              if(this.updateAddres.pan_proof!=null && this.updateAddres.pan_proof!='default.png'){
                
                this.pan_i=this.updateAddres.pan_proof;  
             }
this.form.get("dob").setValue(this.updateAddres.dob);
            this.form.get("gender").setValue(this.updateAddres.gender);
            
            this.form
              .get("landmark")
              .setValue(this.updateAddres.landmark);
            this.form
              .get("pin_code")
              .setValue(this.updateAddres.pin_code);
            this.form
              .get("country_id")
              .setValue(this.updateAddres.country_id);
            this.form
              .get("state_id")
              .setValue(this.updateAddres.state_id);
            this.form
              .get("city_id")
              .setValue(this.updateAddres.city_id);
            this.country_fetch = this.updateAddres.country;
           
            this.state_fetch = this.updateAddres.state;
            this.city_fetch = this.updateAddres.city;
              this.form.get("state").setValue(this.state_fetch);

          this.form.get("city").setValue(this.city_fetch);
 this.form.get("country").setValue(this.country_fetch);
this.form.get("receiver_last_name").setValue(this.updateAddres.receiver_last_name);

             // this.getStates(this.updateAddres.country_id);
            this.country = this.updateAddres.country_id;
            this.form.get("email").setValue(this.updateAddres.email);
          
            this.form.get("contact_no").setValue(this.updateAddres.contact_no);
           

          if(this.updateAddres.email!=null && this.updateAddres.email!='null' && this.updateAddres.email!=''){
            this.email_disable=false;
            this.form.get("email_disable").setValue(this.updateAddres.email);
 
          }
if(this.updateAddres.contact_no!=null && this.updateAddres.contact_no!='null' && this.updateAddres.contact_no!=''){
            this.contact_disable=false;
            this.form.get("contact_disable").setValue(this.updateAddres.contact_no);

          }
 
//  if(this.updateAddres.email!=null){
//             this.email_disable=false;
//           }
// if(this.updateAddres.contact_no!=null){
//             this.contact_disable=false;
//           }
           this.valid_toU=this.updateAddres.dob;
                 // }
                 if(this.allResult.profile_image!=null && this.allResult.profile_image!='default.png'){
                 this.previewUrl2=this.allResult.profile_image;
                this.previewUrl=this.allResult.profile_image;
                this.profile_i=this.allResult.profile_image;
                 }

             }
             else{
               this.buis_update=false;
               this.form.get("email").setValue(this.allResult.email);
          if(this.allResult.email!=null && this.allResult.email!='' && this.allResult.email!='null'){
            this.email_disable=false;
            this.form.get("email_disable").setValue(this.allResult.email);
 
          }
 this.form.get("contact_no").setValue(this.allResult.mobile);
if(this.allResult.mobile!=null && this.allResult.mobile!='' && this.allResult.mobile!='null'){
            this.contact_disable=false;
            this.form.get("contact_disable").setValue(this.allResult.mobile);

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



   get f() { 
    return this.form.controls; 
  }
  onFileChanged1(fileInput: any) {
    if(fileInput.target.value!='' && fileInput.target.value!=null){
   
      this.imgHeight=0;
      this.imgWidth=0;
   
      this.previewUrl = this.previewUrl2;
              //   this.fileData = null;
              //  this.image = null;    

    this.fileData = <File>fileInput.target.files[0];
    this.image = <File>fileInput.target.files[0];    

     let siz11 = Math.ceil(this.image.size / 1024);

    var checkimg11 = this.image.name.toLowerCase();
     if (!checkimg11.match(/(\.jpg|\.png|\.JPG|\.PNG|\.jpeg|\.JPEG)$/)) {
      this.snackbar.open("Only jpg,png,jpeg file format support. ", "", {
        duration: 3000,
        horizontalPosition: "right"
      });
     this.previewUrl = this.previewUrl2;
              //   this.fileData = null;
              //  this.image = null;  
              //   this.form.get('image').setValue('');
 // this.form.controls.image = null; 
      return false;
    }

    if (siz11 > 2048) {
      this.snackbar.open("Only 2MB and less size file can upload. ", "", {
        duration: 3000,
        horizontalPosition: "right"
      });
      // this.previewUrl = this.previewUrl2;
      //           this.fileData = null;
      //          this.image = null; 
      //           this.form.get('image').setValue('');
 // this.form.controls.image = null;  

      return false;
    }


  let img = new Image();
      
      img.src = window.URL.createObjectURL(this.fileData);
      img.onload = () => {
       this.imgHeight=img.height;
       this.imgWidth=img.width;
        this.previewT();
     }
    }
    // this.previewT();
  }
 
  previewT() {
    // Show preview 
    var mimeType2 = this.fileData.type;
    if (mimeType2.match(/image\/*/) == null) {
      return;
    }
 
    var reader2 = new FileReader();      
    reader2.readAsDataURL(this.fileData); 
    reader2.onload = (_event) => { 
       if( this.imgHeight > 5000 && this.imgWidth > 7000 ) {
             this.snackbar.open('Image height should < 5000 and Width should < 7000. ','' ,{
                duration: 5000,
                horizontalPosition:'right',
              }); 
             
             
              this.previewUrl = this.previewUrl2;
              //   this.fileData = null;
              //  this.image = null;
              //   this.form.get('image').setValue('');
 // this.form.controls.image = null;    

              return;
          }
          else if( this.imgWidth > 7000   ) {
              this.snackbar.open('Image Width should < 7000. ','' ,{
                duration: 5000,
                horizontalPosition:'right',
              }); 
             this.previewUrl = this.previewUrl2;
              //  this.fileData = null;
//                this.image = null;   
//                 this.form.get('image').setValue('');
//  this.form.controls.image = null; 

              return;
          }
           else if( this.imgHeight > 5000 ) {
              this.snackbar.open('Image height should < 5000. ','' ,{
                duration: 5000,
                horizontalPosition:'right',
              });
             this.previewUrl = this.previewUrl2;
              //  this.fileData = null;
              //  this.image = null;  
              //   this.form.get('image').setValue('');
 // this.form.controls.image = null;  

              return;
          }
          else{
               this.previewUrl = reader2.result; 
          }
     
    
    }
  }
   // start pan proof
onFileChangedPan(fileInput: any) {
    if(fileInput.target.value!='' && fileInput.target.value!=null){
   
      this.imgHeight=0;
      this.imgWidth=0;
   
    this.pan_fileData = <File>fileInput.target.files[0];
    this.pan_image = <File>fileInput.target.files[0];    

     let siz11 = Math.ceil(this.pan_image.size / 1024);

    var checkimg11 = this.pan_image.name.toLowerCase();
     if (!checkimg11.match(/(\.jpg|\.png|\.JPG|\.PNG|\.jpeg|\.JPEG)$/)) {
      this.snackbar.open("Only jpg,png,jpeg file format support. ", "", {
        duration: 3000,
        horizontalPosition: "right"
      });
        return false;
    }

    if (siz11 > 2048) {
      this.snackbar.open("Only 2MB and less size file can upload. ", "", {
        duration: 3000,
        horizontalPosition: "right"
      });
    
      return false;
    }


    }
    // this.previewT();
  }
 
 
   //end pan proof

   //start address proof
 onFileChangedAddress(fileInput: any) {
    if(fileInput.target.value!='' && fileInput.target.value!=null){
   
      this.imgHeight=0;
      this.imgWidth=0;
   
    this.address_fileData = <File>fileInput.target.files[0];
    this.address_image = <File>fileInput.target.files[0];    

     let siz11 = Math.ceil(this.address_image.size / 1024);

    var checkimg11 = this.address_image.name.toLowerCase();
     if (!checkimg11.match(/(\.jpg|\.png|\.JPG|\.PNG|\.jpeg|\.JPEG)$/)) {
      this.snackbar.open("Only jpg,png,jpeg file format support. ", "", {
        duration: 3000,
        horizontalPosition: "right"
      });
        return false;
    }

    if (siz11 > 2048) {
      this.snackbar.open("Only 2MB and less size file can upload. ", "", {
        duration: 3000,
        horizontalPosition: "right"
      });
    
      return false;
    }


    }
    // this.previewT();
  }
 
 
   //end address proof
  fileProgress(fileInput: any) {
  }

   otpGenerate() {
     console.log(this.form.controls.referral_code.value);
     if(this.form.controls.referral_code.value==null || this.form.controls.referral_code.value==''){

      alert("Please enter Referral Code.");
    
     }
     else{
        this.otpgeneration = false;
          this.loading=false;

        this.adminService.sendOtpVerifyReferral(this.form.value).subscribe(
          data => {
              this.loading=true;

            this.verify = false;
            if (data["status"] == "1") {
              this.otpgeneration = true;
              this.verify = true;
              this.snackbar.open(data["msg"], "", {
                duration: 3000,
                horizontalPosition: "center"
              });
            }
            else{
               this.snackbar.open(data["msg"], "", {
                duration: 3000,
                horizontalPosition: "center"
              });
             // this.otpgeneration = true;
            }
          },
          error => {
              this.loading=true;

          }
        );
      }
  }
  otpVerificationUser(data) {
      this.loading=false;

    this.adminService.otpVerificationUserReferral(this.form.value).subscribe(
      data => {
          this.loading=true;

        if (data["status"] == "1") {
          this.otpgeneration = false;
          this.referral_verification=true;
          this.snackbar.open("OTP is verified successfully ", "", {
            duration: 3000,
            horizontalPosition: "center"
          });
        } else {
           this.otpgeneration =true;
          this.snackbar.open("OTP is not valid ", "", {
            duration: 3000,
            horizontalPosition: "center"
          });
        }
      },
      error => {
          this.loading=true;
           this.otpgeneration =true;
        this.snackbar.open("Something went wrong,please try again.", "", {
          duration: 3000,
          horizontalPosition: "center"
        });
      }
    );
  }
  resendOtpVerify(data) {
     if(this.form.controls.referral_code.value==null || this.form.controls.referral_code.value==''){

      alert("Please enter Referral Code.");
    
     }
     else{
    
      this.loading=false;

    this.adminService.sendOtpVerifyReferral(this.form.value).subscribe(
      data => {
        this.loading=true;

        if (data["status"] == "1") {
          this.snackbar.open(data["msg"], "", {
            duration: 3000,
            horizontalPosition: "center"
          });
        }
         this.verify = true;
      },
      error => {
         this.verify = true;
        this.loading=true;

      }
    );
  }
  }



  compSettings(dd) {
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
        if(v=='1'){
          this.referral_compulsory=true;
        }
      
       } else {
        this.referral_ask==false;
       }

     });
 }

 
 compSettingsMemberPan(dd) {
  this.adminService
   .fetch_particular_company_registry_with_sno({ comp_num: dd,s_no:30})
   .subscribe(data => {
  


     if (data["status"] == 1) {
        let d = data['data'];
        let v = d.value;
      this.pan_necessory=v;
    }

   });
}
referral_details(referral_code){
this.adminService
     .referral_details({ user_num: this.user_num,access_token:this.access_token,referral_code:referral_code,comp_num:this.comp_num})
     .subscribe(data => {
    


       if (data["status"] == 1) {
          
       this.refer=data['result'];
      
       } else {
       }

     });

}
skip_referral(){
  this.referral_verification=true;
  this.skip_refer=true;
  this.form.get('referral_code').setValue('000000');
}

}

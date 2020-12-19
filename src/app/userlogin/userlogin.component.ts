
import { Component, OnInit } from '@angular/core';
import { RoarclubserviceService } from "../roarclubservice.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AlertService, AuthenticationService } from '../_services';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Location } from "@angular/common";
import { first } from "rxjs/operators";
import { CookieService } from "ngx-cookie-service";

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
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements OnInit {
  
  loginuser:FormGroup;
  forgotForm:FormGroup;
    otpForm: FormGroup;
    otpFormLogin: FormGroup;
is_confirm=false;
    signup = 1;
    pass=0;
  loading = true;
  signotp = false;
verify=false;
  submitted = false;
  otpgeneration=false;
  returnUrl: string;
  public visibility = true;
  public visiblityoff = false;
    public shownamebox = false;

  constructor(
    private toysservices: RoarclubserviceService,
    private formBuilder: FormBuilder, 
    private snackbar: MatSnackBar,
    private router: Router,
     private cookie: CookieService,
      private location :Location,
    private authenticationService: AuthenticationService,
        private modalService: NgbModal,

  ) { }
 openXl(content) {
    this.modalService.open(content, { size: "md" });
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

  ngOnInit() {
    this.loginuser = this.formBuilder.group({
      username:['' , Validators.required],
      password:['', Validators.required]
    
    });
     this.forgotForm = this.formBuilder.group({
      username:['' , Validators.required],
    
    
    });
      this.otpFormLogin = this.formBuilder.group({
      username:["", Validators.required],
       otp: ["", Validators.required],
    
    
    });
      this.otpForm = this.formBuilder.group(
      {
        // username: ['', Validators.required],
        password: ["", Validators.required],
        confirmPassword: ["", Validators.required],
        otp: ["", Validators.required],
        username: ["", Validators.required],
        usertype_id: "1"
      },
      { validator: this.PasswordValidator }
    );
   
  }

  get f() {
    return this.loginuser.controls;
  }

  login(){
    this.  submitted = false;
    let data = this.loginuser.value;
    if(this.loginuser.invalid){
      this.snackbar.open("please fil required field","ok", {
        duration: 3000
      }); 
    }
    else{
    this.authenticationService.loginClient(this.f.username.value,this.f.password.value).subscribe(
      data=>{
        if(data['status'] == 1){
          this.snackbar.open("Login Successfull", "", {
            duration: 9000
          }); 
          localStorage.setItem("flag",'1');
          sessionStorage.setItem("user_num",data['user_num']);
          sessionStorage.setItem("access_token",data['access_token']);
          sessionStorage.setItem("jwtoken",data['jwtoken']);
          sessionStorage.setItem("usertype_id",data['usertype_id']);
          sessionStorage.setItem('email', data['email']);
           // this.location.back();
            if(this.cookie.get('buy_now_product')=="true"){
               this.toysservices.buy = true;
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
          // location.reload();
          // this.ngOnInit();
          // this.router.navigate(['/']);
        //   this.router.navigateByUrl('/home', { skipLocationChange: true }).then(() => {
        //     this.router.navigate(['/']);
        // }); 
        
        }
       
        else if(data['status'] == 0){
          //  location.reload();
          this.snackbar.open("Invalid Email and Password ", "", {
            duration: 3000
          }); 
        }
      });
    }
  }

  // forgotpassword

 forgotPassword() {
    let postData = this.forgotForm.value;

  
      if (this.forgotForm.invalid) {
        alert("* fields are required.")
      }  
      else{
        this.toysservices.forgotPassword(postData).subscribe(
          data => {
            if (data["status"] == 1) {
             
              this.snackbar.open(data["msg"], "", {
                duration: 3000
              });
             
            } else {
               this.snackbar.open("Please Try Again", "", {
                duration: 3000
              });
            }
          },
          error => {
            this.snackbar.open("Something Went wrong please try again. ", "", {
              duration: 3000
            });
          }
        );
        
      }
   
   
   
  }
  passvible(){
    this.visibility = !this.visibility;
    
  }
  // forgotpassword end
  onSubmitSign() {
    this.loading = false;
    if (this.signup == 0 || this.signup == 2) {
      this.signup = 1;
      this.loading = true;
    } else {
      this.loading = true;
      this.submitted = true;

      // stop here if form is invalid
      if (this.loginuser.controls.username.value=='') {
        this.loading = true;
        this.snackbar.open("Please fill correct email/mobile. ", "", {
                  duration: 3000
                });
        return;
      } else {
        this.loading = false;
        // this.loading = true;
        let data = this.loginuser.value;
        this.toysservices
          .registerVendor(data)
          .subscribe(
            data => {
              // this.loading = false;
              if (data["status"] == 1) {
                // this.snackbar.open(". ", "", {
                //   duration: 3000
                // });
                this.loading = true;

                this.signup = 2;
                this.signotp = true;

                this.otpForm.get('username').setValue(this.loginuser.controls.username.value) ;
                this.snackbar.open(
                  "OTP is send to your email/mobile,please verify. ",
                  "",
                  {
                    duration: 3000
                  }
                );

                // this.router.navigate(["/register"]);
              } else {
                this.loading = true;
                this.snackbar.open("Already exist, Please Try another ", "", {
                  duration: 3000
                });
              }
            },
            error => {
              this.loading = true;
              this.snackbar.open(
                "Something Went wrong please try again. ",
                "",
                {
                  duration: 3000
                }
              );
            }
          );
      }
    }
  }

checkUserExist() {
    let postData = this.loginuser.value;
    // console.log(this.loginuser.controls.username.value);
     this.otpFormLogin.get('username').setValue(this.loginuser.controls.username.value) ;
    // console.log(this.otpFormLogin.controls.username.value);
               
    // console.log(postData);

  
      
        this.toysservices.checkUserExist(postData).subscribe(
          data => {
            if (data["status"] == 1) {
             
             this.pass=2;
             
            } else {
               this.pass=1;
            }
          },
          error => {
            this.snackbar.open("Something Went wrong please try again. ", "", {
              duration: 3000
            });
          }
        );
        
      
   
   
   
  }
PasswordValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    let password = control.get("password");
    let confirmPassword = control.get("confirmPassword");
    if (password.pristine || confirmPassword.pristine) {
      return null;
    }
    return password &&
      confirmPassword &&
      password.value != confirmPassword.value
      ? { misMatch: true }
      : null;
  }

  onSubmitResendOtp() {
    let data = this.otpForm.value;
    if (
      this.otpForm.controls.username == null ||
      this.otpForm.controls.username.value == ""
    ) {
      this.snackbar.open("Please fill the username field. ", "", {
        duration: 3000
      });
    } else {
      this.loading = false;
      this.toysservices
        .ResendOtpVerification(data)
        .pipe(first())
        .subscribe(
          data => {
            this.loading = false;
            if (data["status"] == 1) {
              this.signup = this.signup;
              this.loading = true;
              this.snackbar.open(
                "OTP is send to your email/mobile,please verify. ",
                "",
                {
                  duration: 3000
                }
              );
            } else {
              this.loading = true;
              this.snackbar.open(
                "Incorrect Credentials Please Try again ",
                "",
                {
                  duration: 3000
                }
              );
            }
          },
          error => {
            this.loading = true;
            this.snackbar.open("Something Went wrong please try again. ", "", {
              duration: 3000
            });
          }
        );
    }
  }
  get g() {
    return this.otpForm.controls;
  }
  onSubmitOTP() {
    // this.signup=false;
    this.loading = false;

    if (this.otpForm.invalid) {
      this.loading = true;
      this.snackbar.open("Please fill all required fields correctly.", "", {
              duration: 3000
            });
      return;
    }
    this.loading = false;
    
    this.authenticationService
      .otpVerified(
        this.g.username.value,
        this.g.password.value,
        this.g.otp.value,
        this.g.usertype_id.value,
        this.g.confirmPassword.value
      )
      .subscribe(
        data => {
          this.loading = false;
          if (data["status"] == 1) {
            this.signup = 0;
            this.loading = true;
            this.snackbar.open("OTP Verified and Login Successfull.", "", {
              duration: 3000
            });
            localStorage.setItem("flag", "1");
            sessionStorage.setItem("user_num", data["user_num"]);
            sessionStorage.setItem("access_token", data["access_token"]);
            sessionStorage.setItem("jwtoken", data["jwtoken"]);
            sessionStorage.setItem("usertype_id", data["usertype_id"]);
            sessionStorage.setItem("email", data["email"]);
            sessionStorage.setItem("mobile", data["mobile"]);
            // return;
            // location.reload();
            // this.ngOnInit();
            if(this.cookie.get('buy_now_product')=="true"){
               this.toysservices.buy = true;
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
            // this.location.back();
            // this.router.navigate(["/"]);
          } else {
            this.loading = true;
            this.snackbar.open("Incorrect Credentials Please Try again ", "", {
              duration: 3000
            });
          }
        }
      );
  }

  otpVerificationUser(data) {//otpVerificationForLogin
    // this.signup=false;
    this.loading = false;

    // console.log(this.otpForm);
    if (this.otpFormLogin.invalid) {
      this.loading = true;
      this.snackbar.open("Please fill all required fields correctly.", "", {
              duration: 3000
            });
      return;
    }
    this.loading = false;
    
    this.authenticationService
      .otpVerificationForLogin(
        this.otpFormLogin.controls.username.value,
        this.otpFormLogin.controls.otp.value,
      
      )
      .subscribe(
        data => {
          this.loading = false;
          // console.log(data);
          if (data["status"] == 1) {
            // console.log(data);
            this.signup = 0;
            this.loading = true;
            this.snackbar.open("OTP Verified and Login Successfull.", "", {
              duration: 3000
            });
            localStorage.setItem("flag", "1");
            sessionStorage.setItem("user_num", data["user_num"]);
            sessionStorage.setItem("access_token", data["access_token"]);
            sessionStorage.setItem("jwtoken", data["jwtoken"]);
            sessionStorage.setItem("usertype_id", data["usertype_id"]);
            sessionStorage.setItem("email", data["email"]);
            sessionStorage.setItem("mobile", data["mobile"]);
            // return;
            // location.reload();
            // this.ngOnInit();

             if(this.cookie.get('buy_now_product')=="true"){
               this.toysservices.buy = true;
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
            // this.location.back();
            // this.router.navigate(["/"]);
          } else {
            this.loading = true;
            this.snackbar.open("Incorrect Credentials Please Try again ", "", {
              duration: 3000
            });
          }
        }
      );
  }

  otpGenerate(data) {
    this.loading=false;
    this.otpgeneration = false;
    this.toysservices.otpSendForLogin(this.otpFormLogin.value).subscribe(
      data => {
        this.verify = false;
        this.loading=true;
        if (data["status"] == "1") {
          this.shownamebox = false;
  
          this.otpgeneration = true;
          this.verify = true;
          this.snackbar.open(data["msg"], "", {
            duration: 3000,
            horizontalPosition: "center"
          });
        }
      },
      error => {
        this.loading=true;
      }
    );
  }
  resendOtpVerify(data) {
    this.loading=false;
    this.toysservices.resendOtpForLogin(this.otpFormLogin.value).subscribe(
      data => {
        this.loading=true;
        if (data["status"] == "1") {
          this.verify = true;
                    this.shownamebox = false;

          
          this.snackbar.open(data["msg"], "", {
            duration: 3000,
            horizontalPosition: "center"
          });
        }
      },
      error => {
        this.loading=true;
      }
    );
  }
  edit(){

   
  this.shownamebox = true;
  this.verify=false;
  }
  cancel(){
    this.shownamebox = false;
    this.verify=true;
  }
//21/08/2020
checkConfirmPassword() {
  

    if(this.otpForm.controls.confirmPassword.value != this.otpForm.controls.password.value){
      this.is_confirm=true;
    }
    else{
      this.is_confirm=false;
    }
  }
  back() {
    this.location.back()
  }
 } 



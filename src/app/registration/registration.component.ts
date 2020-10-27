
import { Component, OnInit } from "@angular/core";
import { RoarclubserviceService } from "../roarclubservice.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AlertService, AuthenticationService } from "../_services";
import { Location } from "@angular/common";

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

import { first } from "rxjs/operators";
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  otpForm: FormGroup;
  otpResendForm: FormGroup;
  loading = true;
  submitted = false;
  signup = 1;
  signotp = false;
  user_num;
  returnUrl: string;
  constructor(
    private snackbar: MatSnackBar,
    private formBuilder: FormBuilder,
  private location :Location,
    private router: Router,
    private adminservice: RoarclubserviceService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    // var host = location.origin;
    this.loading = true;
    this.loginForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
      // usertype_id : '2'
    });
    this.registerForm = this.formBuilder.group({
      username: ["", Validators.required],
      // password: ['', Validators.required],
      usertype_id: "1"
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
    this.otpResendForm = this.formBuilder.group({
      // username: ['', Validators.required],
      password: ["", Validators.required],
      otp: ["", Validators.required],
      username: ["", Validators.required]
    });
    // get return url from route parameters or default to '/'
    this.loading = true;
  }
  onSubmitSign() {
    this.loading = false;
    if (this.signup == 0 || this.signup == 2) {
      this.signup = 1;
      this.loading = true;
    } else {
      this.loading = true;
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
        this.loading = true;
        return;
      } else {
        this.loading = false;
        // this.loading = true;
        let data = this.registerForm.value;
        this.adminservice
          .registerVendor(data)
          .pipe(first())
          .subscribe(
            data => {
              // this.loading = false;
              if (data["status"] == 1) {
                this.snackbar.open(". ", "", {
                  duration: 3000
                });
                this.loading = true;

                this.signup = 2;
                this.signotp = true;
                this.otpForm.get('username').setValue(this.registerForm.controls.username);
                // this.otpForm.controls.username = this.registerForm.controls.username;
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
  get f() {
    return this.loginForm.controls;
  }
  onSubmitResend() {
    if (this.signup == 0 || this.signup == 2 || this.signup == 1) {
      this.signup = 4;
      this.loading = true;
    } else {
      if (this.otpForm.invalid) {
        this.loading = true;
        return;
      }

      // this.loading = true;
      this.loading = false;
      let data = this.otpForm.value;
      this.adminservice
        .otpVerification(data)
        .pipe(first())
        .subscribe(
          data => {
            this.loading = false;
            if (data["status"] == 1) {
              this.signup = this.signup;
              this.loading = true;
              this.snackbar.open(
                "OTP is send to your email,please verify. ",
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
      this.adminservice
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
    // this.loading = true;
    // let data = this.otpForm.value;
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
            if(sessionStorage.getItem('routes') && sessionStorage.getItem('routes')!=null){
              this.router.navigate([sessionStorage.getItem('routes')]);
             
            }
            else{
              this.router.navigate(["/"]);
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
}


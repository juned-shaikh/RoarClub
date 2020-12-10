import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Router, ActivatedRoute } from "@angular/router";
import { environment } from "../../environments/environment";

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient, private router: Router) {}
  public give() {
    if (localStorage.getItem("currentUser")) {
      return true;
    } else {
      return false;
    }
  }
  baseUrl = environment.baseUrl;
  uploadUrlApi = environment.UploadUrl;

  login(username: string, password: string) {
    return this.http
      .post<any>(this.baseUrl + `registration/login`, {
        username: username,
        password: password
      })
      .pipe(
        map(user => {
          // login successful if there's a jwt token in the response
          if (user) {
            sessionStorage.setItem("tokenObject", user.jwtoken);
          }

          return user;
        })
      );
  }
  add_customer_registrationuser2(postData){
     
        
          sessionStorage.setItem("tokenObject", postData);
      return 0;
    

  }

  loginClient(username: string, password: string) {
    return this.http
      .post<any>(this.baseUrl + `registration/login`, {
        username: username,
        password: password
      })

      .pipe(
        map(user => {
          // login successful if there's a jwt token in the response
          if (user) {
            sessionStorage.setItem("tokenObject", user.jwtoken);
          }

          return user;
        })
      );
  }

  loginClient2(username: string, password: string,comp_num:string) {
    return this.http
      .post<any>(this.baseUrl + `registration/login`, {
        username: username,
        password: password,
        comp_num:comp_num
      })

      .pipe(
        map(user => {
          // login successful if there's a jwt token in the response
          if (user) {
            sessionStorage.setItem("tokenObject", user.jwtoken);
          }

          return user;
        })
      );
  }

  otpVerified(username : any,password : any , otp : any,usertype_id : any , confirmPassword : any){
    return this.http
      .post<any>(this.baseUrl + `company/otpVerification`, {
        username: username,
        password: password,
        otp :otp,
        usertype_id : usertype_id,
        confirmPassword : confirmPassword
      })
    .pipe(map(
      data =>{
        if(data){
          sessionStorage.setItem("tokenObject", data.jwtoken);
        }
      return data;
      }
    ))

  }
  otpVerificationForLogin(username: any, otp : any) {
    return this.http
      .post<any>(this.baseUrl + `registration/otpVerificationForLogin`, {
        username: username,
        otp: otp
      })

      .pipe(
        map(user => {
          // login successful if there's a jwt token in the response
          if (user) {
            sessionStorage.setItem("tokenObject", user.jwtoken);
            // console.log(user);
          }

          return user;
        })
      );
  }


  otpVerificationForLogin2(username: any, otp : any,comp_num:any) {
    return this.http
      .post<any>(this.baseUrl + `registration/otpVerificationForLogin`, {
        username: username,
        otp: otp,
        comp_num:comp_num
      })

      .pipe(
        map(user => {
          // login successful if there's a jwt token in the response
          if (user) {
            sessionStorage.setItem("tokenObject", user.jwtoken);
            // console.log(user);
          }

          return user;
        })
      );
  }
  logout() {
    sessionStorage.clear();
    this.router.navigate(["/Admin/login"]);
  }
}

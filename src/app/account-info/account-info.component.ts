// import { Component, OnInit } from '@angular/core';
import { RoarclubserviceService } from '../roarclubservice.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Component, OnInit, EventEmitter, Input, Output } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators , FormControl } from '@angular/forms';

import { Option } from "../option.model";
@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent implements OnInit {
  public access_token=sessionStorage.getItem('access_token');
  public user_num=sessionStorage.getItem('user_num');  
  public comp_num=sessionStorage.getItem('comp_num');
  public comp_num_new=sessionStorage.getItem('comp_num_new');
  
  public comp_id = sessionStorage.getItem('comp_num');
  public data = {access_token:this.access_token, comp_num:this.comp_num}
  userdata;
  public is_confirm = false;
  public changepasssbox =false;
  public shownamebox = false;
  Changepassword:FormGroup;
  public visibility = true;
  public visiblityoff = false;

  public visibility2 = true;
  public visiblityoff2 = false;

  public visibility3 = true;
  public visiblityoff3 = false;
  
 
  constructor(	 private adminService: RoarclubserviceService,
    private router:Router,
    private snackbar : MatSnackBar,
    private route : ActivatedRoute,
    private formbuilder : FormBuilder) { }

  ngOnInit() {
    this.Changepassword = this.formbuilder.group({
      
      old_password : ['', Validators.required],
      new_password : ['', Validators.required],
      confirm_password : ['', Validators.required],
      
      });
  }
  get f() {
    return this.Changepassword.controls;
    
  }
  checkConfirmPassword() {
  

    if(this.Changepassword.controls.confirm_password.value != this.Changepassword.controls.new_password.value){
      this.is_confirm=true;
    }
    else if(this.Changepassword.controls.confirm_password.value == null){
      this.is_confirm=false;
    }
    else{
      this.is_confirm=false;
    }
  }
  ChangePassword(){
    let data = this.Changepassword.value;
    data.access_token = this.access_token;
    data.user_num = this.user_num;
    if(this.Changepassword.controls.new_password.value!=this.Changepassword.controls.confirm_password.value){
      this.snackbar.open("Confirm password doesn't match with new password.","",{
     duration:3000,
      })}
    else if(this.Changepassword.invalid){
      this.snackbar.open("please fill required field ","",{
        duration:3000,
         });
    }
   else{
    this.adminService.reset_password(data).subscribe(data =>{
      if(data['status'] ==1){
       this.snackbar.open("password change successfully","",{
      duration:3000,
       });
       location.reload();
      }
      else if(data['status']==0){
        this.snackbar.open("old password is not currect","",{
          duration:3000,
           });
      }
          });
   }
  
   }
   showchangepass(){
    this.router.navigate(['/home_profile/customer-profile']);
   }

}

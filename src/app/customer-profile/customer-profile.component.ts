import { Component, OnInit } from '@angular/core';
import { RoarclubserviceService } from "../roarclubservice.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators , FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.css']
})
export class CustomerProfileComponent implements OnInit {
 public access_token=sessionStorage.getItem('access_token');
  public user_num=sessionStorage.getItem('user_num');  
  public comp_num=sessionStorage.getItem('comp_num');
  public comp_num_new=sessionStorage.getItem('comp_num_new');
  
  public comp_id = sessionStorage.getItem('comp_num');
  public data = {access_token:this.access_token, comp_num:this.comp_num}
  userdata;
  public changepasssbox =false;
  public shownamebox = false;
  Changepassword:FormGroup;
  updateprofile:FormGroup;
  
  constructor(
  	 private adminService: RoarclubserviceService,
    private router:Router,
    private snackbar : MatSnackBar,
    private route : ActivatedRoute,
    private formbuilder : FormBuilder) { }

  ngOnInit() {
this.updateprofile=this.formbuilder.group({
   name:[''],
});

    this.Changepassword = this.formbuilder.group({
      
      old_password : ['', Validators.required],
      new_password : ['', Validators.required],
      confirm_password : ['', Validators.required],
      
      });
      
  	this.adminService.get_profile({access_token:this.access_token,user_num:this.user_num, comp_num:this.comp_num_new}).subscribe(data=>{
        if(data['status']==1){ 
          this.userdata = data['result'];
          // this.userdata = data['current']['buisnessInfo'];  
          // this.pickupaddress = data['current']['pickupAddress'] ;
          // this.regaddress = data['current']['registerAddress']
          // this.bank = data['current']['bankDetails']; 
          
          
        }
        else if(data['status']==10){
        sessionStorage.clear();
         this.snackbar.open('Multiple login with this ID has been detected, Logging you out. ','' ,{
                  duration: 5000,
                  horizontalPosition:'center',
          });      
        this.router.navigate(['/login']);
        }
  
        else if(data['status']== 0){
  
        }
     
      }
      );
  }
  get f() {
    return this.Changepassword.controls;
    
  }
  ChangePassword(){
    let data = this.Changepassword.value;
    data.access_token = this.access_token;
    data.user_num = this.user_num;
    if(this.Changepassword.invalid){
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

update(){
  this.shownamebox = false;
  let data = this.updateprofile.value;
  data.access_token = this.access_token;
  data.user_num = this.user_num;
  this.adminService.updateclientname(data).subscribe(data =>{
    if(data['status']==1){
      this.snackbar.open('profile update successfully.','',{
        duration: 2500,
      });
      location.reload();
    }
    
    });
}

  edit(){

   
  this.shownamebox = true;
  }
  cancel(){
    this.shownamebox = false;
  }
  showchangepass(){
this. changepasssbox =!this. changepasssbox;
  }
 

}

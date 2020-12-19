

import { Component, OnInit } from '@angular/core';
import { RoarclubserviceService } from "../roarclubservice.service";
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators , FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  public access_token=sessionStorage.getItem('access_token');
  public user_num=sessionStorage.getItem('user_num');  
  public comp_num=sessionStorage.getItem('comp_num');
  public comp_num_new=sessionStorage.getItem('comp_num_new');
    public usertype_id=sessionStorage.getItem('usertype_id');  

  public comp_id = sessionStorage.getItem('comp_num');
  public data = {access_token:this.access_token, comp_num:this.comp_num}
  userdata;
  public changepasssbox =false;
  public member_refer = false;
  public shownamebox = false;
  public member_wallet = false;
  Changepassword:FormGroup;
  updateprofile:FormGroup;
cust_reg_enable=false;
buis_update=false;
  constructor(
    private adminService: RoarclubserviceService,
    private router:Router,
    private snackbar : MatSnackBar,
    private route : ActivatedRoute,
    private formbuilder : FormBuilder
  ) { }

  ngOnInit(): void {
    this.updateprofile=this.formbuilder.group({
      name:[''],
   });
   
       this.Changepassword = this.formbuilder.group({
         
         old_password : ['', Validators.required],
         new_password : ['', Validators.required],
         confirm_password : ['', Validators.required],
         
         });
    this.compSettingsCustReg();
    this.adminService.get_profile({access_token:this.access_token,user_num:this.user_num, comp_num:this.comp_num_new}).subscribe(data=>{
      if(data['status']==1){ 
        this.userdata = data['result'];
        console.log(this.userdata);
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
  logout() {
    var res = confirm("Are you sure you want to logout.");
     if(res){
      const currentRoute = this.router.url;

      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(["/home"]); 
      }); 
      localStorage.setItem("flag1", "0");
      sessionStorage.clear();
      // location.reload();
      //  const currentRoute = this.router.url;

      // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      //     this.router.navigate(["/home"]); 
      // }); 
      // this.router.navigate(['/home']);
      var rtoken = sessionStorage.getItem('noti_token');
      var topic = "user_"+sessionStorage.getItem('user_num');
      
      
      this.adminService.unsubscribe_topic({topic_name : topic , token : rtoken}).subscribe(data =>{
        if(data['status']=='1'){
          console.log("topic unsubscribed successfully");
          location.reload();
          const currentRoute = this.router.url;

          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(["/"]); 
          }); 
  
        }else{
          console.log("topic not unsubscribed")
        }
      })
      this.router.navigate(["/"]);
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
  
    edit(){
  
     
    this.shownamebox = true;
    }
    cancel(){
      this.shownamebox = false;
    }
    showchangepass(){
  this. changepasssbox =!this. changepasssbox;
    }
    fetch_customer(){
      let postData = {
        user_num:this.user_num,
        access_token:this.access_token,
        comp_num:this.comp_num_new
      };
      console.log(postData);

      this.adminService.fetch_customer_registration(postData).subscribe(
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
    compSettingsCustReg() {
      this.adminService
        .fetch_particular_company_registry_with_sno({ comp_num: this.comp_num_new,s_no:21})
        .subscribe(data => {
       
  
  
          if (data["status"] == 1) {
            // if(data['data'].length>0){
            //   for(let k=0;k<data['data'].length;k++){
                // if(data['data'][k].s_no==14 || data['data'][k].s_no=='14'){
                  if(data['data'].value==1 || data['data'].value=='1'){
                    this.cust_reg_enable=true;
                    this.compSettingsMemberWallet();
                 this.compSettingsMemberRefer();
                  }
                // }
            //   }
            // }
           }
        });
    }
  
   compSettingsMemberWallet() {
      this.adminService
        .fetch_particular_company_registry_with_sno({ comp_num: this.comp_num_new,s_no:31})
        .subscribe(data => {
       
  
  
          if (data["status"] == 1) {
            // if(data['data'].length>0){
            //   for(let k=0;k<data['data'].length;k++){
                // if(data['data'][k].s_no==14 || data['data'][k].s_no=='14'){
                  if(data['data'].value==1 || data['data'].value=='1'){
                    this.member_wallet=true;
                  }
                // }
            //   }
            // }
           }
        });
    }
  
  
   compSettingsMemberRefer() {
      this.adminService
        .fetch_particular_company_registry_with_sno({ comp_num: this.comp_num_new,s_no:25})
        .subscribe(data => {
       
  
  
          if (data["status"] == 1) {
            // if(data['data'].length>0){
            //   for(let k=0;k<data['data'].length;k++){
                // if(data['data'][k].s_no==14 || data['data'][k].s_no=='14'){
                  if(data['data'].value==1 || data['data'].value=='1'
                    || data['data'].value==2 || data['data'].value=='2'){
                    
                    this.member_refer=true;
                  }
                  console.log(this.member_refer);
                // }
            //   }
            // }
           }
        });
    }
  

}

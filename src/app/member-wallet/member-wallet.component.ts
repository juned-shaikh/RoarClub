import { Component, OnInit ,ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RoarclubserviceService } from "../roarclubservice.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  FormGroupDirective,
  NgForm
} from "@angular/forms";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";

import { SelectionModel } from "@angular/cdk/collections";
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { WindowRefService } from "../window-ref.service";
import { environment } from "../../environments/environment";
import {MatFormFieldModule} from '@angular/material/form-field';

import {
  switchMap,
  takeUntil,
  catchError,
  startWith,
  takeWhile
} from "rxjs/operators";
import { timer, Observable, Subject, interval, Subscription } from "rxjs";
import { TimeInterval } from "rxjs/internal/operators/timeInterval";
@Component({
  selector: 'app-member-wallet',
  templateUrl: './member-wallet.component.html',
  styleUrls: ['./member-wallet.component.css'],
   providers: [WindowRefService]
})
export class MemberWalletComponent implements OnInit {
 @ViewChild(MatSort, {static: true}) sort: MatSort;
myRecharge:FormGroup;

member_no;
public paymentStatus = "Pending";
 public api;
  public subscription: Subscription;
  public flag = 0;
  private foo: any = null;
  public counts=0;
 data={productinfo:sessionStorage.getItem("productinfo")};
  previewFlag = sessionStorage.getItem('previewFlag');

loader=false;
 public access_token=sessionStorage.getItem('access_token');
  public user_num=sessionStorage.getItem('user_num');  
  public comp_num=sessionStorage.getItem('comp_num_new');  
  buis_update;
	allResult;
	loading=true;
	buisness_details;
	address_details;
	updateAddres;
	bank_details;
	  razorpayId;
razorpay_order_id;
rz_key;
amount;
list_amount=[];
sum_amount=0;
dataSource;
 displayedColumns: string[] = [
   "ids",
  
  "order_number",
   "amount",
   "doa",
   // "mrp",
   
 ];
  constructor( 
  	private snackbar:MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private adminService: RoarclubserviceService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private winRef: WindowRefService,
     private http: HttpClient

    ) 
  { }
   openXl(content) {
      this.modalService.open(content, { size: 'md' });
    }
     private getDismissReason(reason: any): string { 
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return  `with: ${reason}`;
      }
    }
  ngOnInit(): void {
  	 this.myRecharge=this.fb.group({
      comp_num:this.comp_num,
      user_num:this.user_num,
      access_token:this.access_token,
      amount2:[''],
      member_no:sessionStorage.getItem('buisness_no'),
        payment_method_id: "",

    key: "",
  

    currency: "INR",
    receipt: "rcptid_111",
    payment_capture: "1",
    name: "",
    email: "",
    mobile: ""
    });
     this.fetch_customer();
   
  }

fetch_customer(){
	console.log(this.myRecharge);
	console.log(this.myRecharge.controls);
	
	console.log('member-wallet');
		this.loading=false;
      let postData = {
      	user_num:this.user_num,
      	access_token:this.access_token,
        comp_num:this.comp_num
      };

      this.adminService.fetch_customer_registration(postData).subscribe(
        data => {
          if (data["status"] == 1) {
             this.loading=true;




            this.allResult = data["result"];
           
if(this.allResult.buisness_no!='0' && this.allResult!=null){
	this.buis_update=true;
  this.member_no=this.allResult.buisness_no;
	 sessionStorage.setItem("buisness_no",this.allResult.buisness_no);
        console.log(this.member_no);
   

           
             this.buisness_details=this.allResult['buisness_details'];
			 this.updateAddres=this.buisness_details['address'];
if(this.buisness_details['bank_details']!=null){
this.bank_details=this.buisness_details['bank_details'];
  
             }
}
             this.fetch_member_transaction();
       
          } else {
          	this.loading=true;

           
          }
        },
        error => {
        	this.loading=true;

         
        }
      );
    }
    recharge(){
    	var post= { comp_num: sessionStorage.getItem("comp_num_new"),
              
                  user_num:this.user_num,
                access_token:this.access_token,
                member_no:this.myRecharge.controls.member_no.value,
                amount:this.myRecharge.controls.amount2.value,
                 receipt:this.myRecharge.controls.receipt.value,
                payment_capture:this.myRecharge.controls.payment_capture.value,
                currency:this.myRecharge.controls.currency.value,
               // amount:this.myRecharge.controls.amount2.value,
               
                };
    	
    	  this.loading = false;
   
    this.adminService.member_wallet_recharge_initiate(post).subscribe(data => {
      this.loading = true;
      // var orders = data["order_id"];
      this.amount = data["amount"];
      this.rz_key=data['key'];
     
      this.razorpay_order_id = data["razorpay_order_id"];
      this.razorpayId = data["productinfo"];

      sessionStorage.setItem("productinfo", data["productinfo"]);
   this.modalService.dismissAll('Save click');
           
      this.initPay();
      this.navigateTo(this.razorpayId);
    });
    this.loading = true;
  
    }



  public initPay(): void {
    var rzp1 = new this.winRef.nativeWindow.Razorpay({
      // key: "rzp_test_9XUwfPpg7b1vBo", //testing
      // key: "rzp_live_pEf6WmxW8zCcr9", //live
      key:this.rz_key,

      amount: this.amount,
      name: this.updateAddres.receiver_name,
      order_id: this.razorpay_order_id,

      handler: this.paymentResponseHander.bind(this),

      prefill: {
        name: this.updateAddres.receiver_name+' '+this.updateAddres.receiver_last_name,
        email: this.updateAddres.email,
        contact:this.updateAddres.contact_no
      },
      notes: {},
      theme: {
        color: "#d4474d"
        // background: linear-gradient(45deg, #6c0753, #e58247, #9c1c8b, #d4474d);
      },
      callback_url:
        environment.baseUrl + "associates/transaction_of_order_wallet_razor_pay"
    });

    rzp1.open();
  }

  navigateTo(id) {
   this.loader=true;
   	this.getPaymentStatus();
  	
  }



  getPaymentStatus() {
 var post={
productinfo:this.razorpayId
  };
     this.api = interval(7000).pipe(startWith(0), switchMap(() => this.adminService.payment_status_check_recharge(post)));
  
    // this.api=setInterval(() => {this.adminService.payment_status_check(this.data)}, 5000);
     
      // if(this.counts<50){
    this.subscription = this.api.subscribe(data => {
       this.counts++;
     
        if (data["status"] == 1) {
            this.paymentStatus = "Success";
             // if( this.paymentStatus == "Success" || this.counts > 70){
               if( this.paymentStatus == "Success" ){
             this.loader=false;
               this.subscription.unsubscribe();
            }
            setTimeout(()=>{
              if(this.previewFlag == '1'){
                this.router
                .navigateByUrl("/RefrshComponent", {
                  skipLocationChange: true
                })
                .then(() => this.router.navigate(["/Admin/preview/my-account/member-wallet"]));

              }else{
              	this.loader=false;
                this.router
                .navigateByUrl("/RefrshComponent", {
                  skipLocationChange: true
                })
                .then(() => this.router.navigate(["/my-account/member-wallet"]));

              }
                   
                  
            },2000);
      
        } else if (data["status"] == 0) {
            this.paymentStatus = "Pending";
            // if(  this.counts > 50){
            //   this.subscription.unsubscribe();
            // }
         
        } else {
        	this.loader=false;
          this.paymentStatus = "Failed";
           if( this.paymentStatus == "Failed"){
          
           // if( this.paymentStatus == "Failed" || this.counts > 30){
             this.subscription.unsubscribe();
          }
         
          
           setTimeout(()=>{
              
            if(this.previewFlag == '1'){
              this.router
              .navigateByUrl("/RefrshComponent", {
                skipLocationChange: true
              })
              .then(() => this.router.navigate(["/Admin/preview/my-account/member-wallet"]));

            }else{
              this.router
              .navigateByUrl("/RefrshComponent", {
                skipLocationChange: true
              })
              .then(() => this.router.navigate(["/my-account/member-wallet"]));

            }
              
           },3000);
             
        }
     
      if(this.flag==1) {
      	this.loader=false;
          setTimeout(()=>{
            if(this.previewFlag == '1'){
              this.router
              .navigateByUrl("/RefrshComponent", {
                skipLocationChange: true
              })
              .then(() => this.router.navigate(["/Admin/preview/my-account/member-wallet"]));

            }else{
              this.router
              .navigateByUrl("/RefrshComponent", {
                skipLocationChange: true
              })
              .then(() => this.router.navigate(["/my-account/member-wallet"]));

            }
          },4000);
      }
     
    });
  // }
  }
ngOnDestroy() {
 
    this.subscription.unsubscribe();

}

  paymentResponseHander(response) {
    let postData = {
      razorpay_payment_id: response.razorpay_payment_id,
      razorpay_signature: response.razorpay_signature,
      razorpay_order_id: response.razorpay_order_id
    };
    this.adminService.transaction_of_order_wallet_razor_pay(postData).subscribe(
      data => {
        if (data["status"] == "1") {
        }
      },
      error => {
        // this.placeOrder = false;
      }
    );
  }
fetch_member_transaction(){
  console.log(this.member_no);
  this.loading=false;
      let postData = {
        user_num:this.user_num,
        access_token:this.access_token,
        comp_num:this.comp_num,
        member_no:this.member_no,
        offset:1,
        page_items:20,
        list:1
      };

      this.adminService.fetch_member_wallet_list(postData).subscribe(
        data => {
          if (data["status"] == 1) {
             this.loading=true;
this.list_amount=data['result_list'];
if(this.list_amount.length>0){
  this.sum_amount=data['result'].sum;

}

this.dataSource = new MatTableDataSource(this.list_amount);
      this.dataSource.sort = this.sort; 
 

             
          } else {
            this.loading=true;

           
          }
        },
        error => {
          this.loading=true;

         
        }
      );
}

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

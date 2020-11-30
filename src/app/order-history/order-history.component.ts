
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RoarclubserviceService } from "../roarclubservice.service";
import {MatSnackBar} from '@angular/material/snack-bar';
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
@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
public orders: any = null;
  public order_id: any;
  public vieworder = false;
  public order_inventory=[];
  public loader=false;
  order_status;
  orderDetails;
  discount_amount;
  
status_order_number;
status_product_name;
  total_mrp;
  status_flow=[];
  discount_total_amount;
  previewFlag = sessionStorage.getItem('previewFlag');
  rating_option=true;
  public access_token = sessionStorage.getItem("access_token");
  public user_num = sessionStorage.getItem("user_num");
  public comp_num = sessionStorage.getItem("comp_num");
 
  return_policy=false;
  cancel_policy=0;
  minDate = new Date();
  dates:any;

  myFormReturn: FormGroup;


  public noOrder=true;
  constructor(
  	 private snackbar:MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private adminservice: RoarclubserviceService,
    private modalService: NgbModal,
    private fb: FormBuilder,) { }
   openXl(content) {
      this.modalService.open(content, { size: 'xl' });
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

  ngOnInit() {
    this.loader=false;
    
    this.myFormReturn=this.fb.group({
      reason:[''],
      order_number:[''],
      order_id:[''],
      order_item_id:[''],
      return_comment:[''],
      product_name:['']
    });
     
    this.compSettings_ratingOption();
    this.compSettings_cancelOption();
    this.compSettings_returnOption();

    this.getOrdersHistory();
    
  }


  sendOrderId(order_id,orderRandomId){
   
    sessionStorage.setItem('order_id',order_id);
    // sessionStorage.setItem('order_item_id', order_item_id)
    this.router.navigate(['/order-details',orderRandomId]);
   this.vieworder = true;

}



getOrdersHistory() {
    this.loader=false;
    var postData = {
      user_num: sessionStorage.getItem("user_num"),
      access_token: sessionStorage.getItem("access_token"),
       comp_num:sessionStorage.getItem("comp_num_new"),
     
    };
    this.adminservice.getOrdersHistory(postData).subscribe(
      data => {


       this.loader=true;
        if (data["status"] == "1") {
          
            this.orders = data["result"];
            for(let i=0;i<this.orders.length;i++){
            	for (let j=0;j<this.orders[i].order_inventory.length;j++){
                this.orders[i].order_inventory[j].order_number=this.orders[i].order_number;
                this.orders[i].order_inventory[j].payment_method_name=this.orders[i].payment_method_name;
            		this.orders[i].order_inventory[j].status_name=this.orders[i].status_name;
            		
                this.orders[i].order_inventory[j].orderRandomId=this.orders[i].orderRandomId;

                this.order_inventory.push(this.orders[i].order_inventory[j]);
            	}

            }
             this.noOrder=true;
            this.loader=true;

           
          } else if (data["status"] == "10") {
            this.loader=true;
            this.router
              .navigateByUrl("/RefreshComponent", {
                skipLocationChange: true
              })
              .then(() => this.router.navigate(["/expired"]));
          } 
          else{
              this.noOrder=false;
             this.loader=true;
          }

      },
      error => {
         this.loader=true;
      }
    );
    this.loader=true;
  }
 
  getImage(image): string {
    return this.adminservice.getGalleryThumbnail1(image);
  }
   getGalleryImage(image): string {
    return this.adminservice.getGalleryImage(image);
  }
 
  view_product(product_no,quick) {
    if(quick=='N'){
    sessionStorage.setItem("pno", product_no);
    if(this.previewFlag == '1'){
    this.router.navigate(["/Admin/preview/product"]);

    }else{
      this.router.navigate(["/product"]);

    }
  }
  }
   view_product2(name, id,slug,quick) {
     let re=" ";
     if(quick=='N'){
    if(this.previewFlag == '1'){
      this.router
      .navigateByUrl("/RefreshComponent", {
        skipLocationChange: true
      })
      .then(() => this.router.navigate(["/Admin/preview/product", slug]));


    }else{
      this.router
      .navigateByUrl("/RefreshComponent", {
        skipLocationChange: true
      })
      .then(() => this.router.navigate(["/product", slug]));

    }
   }
  }
  rating(product) {
  	console.log(product);
    if (
      sessionStorage.getItem("user_num") == "" ||
      sessionStorage.getItem("user_num") == null
    ) {
      this.router.navigate(["/login"]);
    } else {
      let post = {
        user_num: sessionStorage.getItem("user_num"),
        access_token: sessionStorage.getItem("access_token"),
        comp_num: product.comp_num,
        product_no: product.product_no
      };

      this.adminservice.check_order_product(post).subscribe(data => {
        sessionStorage.setItem("comp_rating", product.comp_num);
        sessionStorage.setItem("rating", "1");
        sessionStorage.setItem("product_rating", product.product_no);
        if (data["status"] == 1) {
          if(this.previewFlag == '1'){
            this.router.navigate(["/Admin/preview/reviewrating"]);

          }else{
            this.router.navigate(["/reviewrating"]);

          }
        } else if (data["status"] == 10) {
          sessionStorage.clear();
          this.snackbar.open(
            "Multiple login with this ID has been detected, Logging you out. ",
            "",
            {
              duration: 3000,
              horizontalPosition: "center"
            }
          );
          // this.router.navigate(['/Admin/login']);
        } else if (data["status"] == 0) {
          sessionStorage.setItem("rating", "0");

         if(this.previewFlag == '1'){
            this.router.navigate(["/Admin/preview/reviewrating"]);

          }else{
            this.router.navigate(["/reviewrating"]);

          }
        }
      });
    }
  }
   // start for rating optional
  compSettings_ratingOption() {
    this.adminservice
      .fetch_particular_company_registry_with_sno({ comp_num: sessionStorage.getItem("comp_num_new"),s_no:20 })
      .subscribe(data => {
        if (data["status"] == 1) {
         let d = data['data'];
         let v = JSON.parse(d.value);
         if(v== "0"){
           this.rating_option=false;
         }
         else{
           // this.rating_option=false;
         }
         
        } else {
          // this.rating_option=false;
        }
      });
  }
  
  // end for rating option
  // start for cancel

  compSettings_cancelOption() {
    this.adminservice
      .fetch_particular_company_registry_with_sno({ comp_num: sessionStorage.getItem("comp_num_new"),s_no:22 })
      .subscribe(data => {
        if (data["status"] == 1) {
         let d = data['data'];
         let v = JSON.parse(d.value);
         if(v== "1"){
           this.cancel_policy=1;
           var day=this.minDate.getDate();
    var month=this.minDate.getMonth()+1;
    var year =this.minDate.getFullYear();
    var fullD=year+'-'+month+'-'+day
    ;
         console.log(fullD);
         this.dates=fullD;
         }
        else if(v== "2"){
          this.cancel_policy=2;
        }
       
         
        } 
      });
  }
  update_cancel_initiate(order_item_id2,order_id,parcel_no){
    var res = confirm("Are you sure you want to cancel this order.");
    if(res){
    var order_item_id=[];
    order_item_id.push(order_item_id2);
      this.adminservice
      .cancel_order_by_user(
        { comp_num: sessionStorage.getItem("comp_num_new"),
        
        user_num:this.user_num,
      access_token:this.access_token,
      order_inventories:order_item_id,
      parcel_no:parcel_no,
      order_id:order_id

      }
        )
      .subscribe(data => {
        if (data["status"] == 1) {
         
          this.snackbar.open('This order is cancel. ','' ,{
            duration: 3000,
            horizontalPosition:'center',
        }); 
        this.router.navigateByUrl('/RefrshComponent', { skipLocationChange: true }).then(() =>
        this.router.navigate(['/home_profile/order-history']));          
          
        }  
        else{
          this.snackbar.open('Something went wrong,Please try again. ','' ,{
            duration: 3000,
            horizontalPosition:'center',
        }); 

        }

      
      });
    }
    
   }

  // endd for cancel

  // start for return

return_start(order_id,order_item_id,product_name,order_number){
  this.myFormReturn.get('order_id').setValue(order_id);
 
  this.myFormReturn.get('order_number').setValue(order_number);
  this.myFormReturn.get('order_item_id').setValue(order_item_id);
  this.myFormReturn.get('product_name').setValue(product_name);
  

}
  update_return_initiate(){
    var order_item_id=[];
    order_item_id.push(this.myFormReturn.controls.order_item_id.value);
      this.adminservice
      .update_return_initiate(
        { comp_num: sessionStorage.getItem("comp_num_new"),
        
        user_num:this.user_num,
      access_token:this.access_token,
      order_inventories:order_item_id,
      return_comment:this.myFormReturn.controls.return_comment.value,
      reason:this.myFormReturn.controls.reason.value,
      order_id:this.myFormReturn.controls.order_id.value

      }
        )
      .subscribe(data => {
        if (data["status"] == 1) {
          this.modalService.dismissAll('Save click');
          this.snackbar.open('This order is ready to return. ','' ,{
            duration: 3000,
            horizontalPosition:'center',
        }); 
        this.router.navigateByUrl('/RefrshComponent', { skipLocationChange: true }).then(() =>
        this.router.navigate(['/home_profile/order-history']));          
          
        }  
        else{
          this.snackbar.open('Something went wrong,Please try again. ','' ,{
            duration: 3000,
            horizontalPosition:'center',
        }); 

        }
      
      });
    
   }
   compSettings_returnOption() {
    this.adminservice
      .fetch_particular_company_registry_with_sno({ comp_num: sessionStorage.getItem("comp_num_new"),s_no:18 })
      .subscribe(data => {
        if (data["status"] == 1) {
         let d = data['data'];
         let v = JSON.parse(d.value);
         if(v== "1"){
           this.return_policy=true;
           var day=this.minDate.getDate();
           var month=this.minDate.getMonth()+1;
           var year =this.minDate.getFullYear();
           var fullD=year+'-'+month+'-'+day
           ;
                console.log(fullD);
                this.dates=fullD;
         }
       
         
        } 
      });
  }
  
  // end for rating option
  // end for return
  // track detail
trackStatus(status,name,order_number){
this.status_flow=status;
this.status_order_number=order_number;
this.status_product_name=name;
}
  //track detail

}

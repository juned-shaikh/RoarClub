
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RoarclubserviceService } from "../roarclubservice.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';

import {
  FormControl,
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  FormGroupDirective,
  NgForm
} from "@angular/forms";
import { saveAs } from 'file-saver'; 

// declare var require: any
// const FileSaver = require('file-saver');

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
public orders=[];
  public order_id: any;
  public order_inventory=[];
  return_choose=[];
  comp_num=sessionStorage.getItem("comp_num_new");
  public loader=false;
  invoice_gen=0;
  order_status;
  awb_no;
  track;
  track_more=false;
  courier_method_id;
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
  // public comp_num = sessionStorage.getItem("comp_num");
 
  return_policy=false;
  cancel_policy=0;
  minDate = new Date();
  dates:any;
  return_reason=0;

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
this.compSettingsInvoice();
    this.getOrdersHistory();
    
  }


  sendOrderId(order_id,orderRandomId){
   
    sessionStorage.setItem('order_id',order_id);
    // sessionStorage.setItem('order_item_id', order_item_id)
    this.router.navigate(['/my-account/order-details',orderRandomId]);


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


      //  this.loader=true;
        if (data["status"] == "1") {
          
            this.orders = data["result"];
            this.loader=true;
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
    // this.loader=true;
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
    if (this.myFormReturn.invalid ) {
      this.snackbar.open("* fields are required. ", "", {
        duration: 3000
      });
        

      }  
      else{
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
                this.compSettings_return_reason_Option();
               
         }
       
         
        } 
      });
  }
   // start for reason
   compSettings_return_reason_Option() {
    this.adminservice
      .fetch_particular_company_registry_with_sno({ comp_num: sessionStorage.getItem("comp_num_new"),s_no:28 })
      .subscribe(data => {
        if (data["status"] == 1) {
         let d = data['data'];
         let v = JSON.parse(d.value);
         if(v== "1"){
           this.return_reason=1;
           console.log(3);
           this.reason_dropdown();
           
               
         }
       
         
        } 
      });
  }
  reason_dropdown(){
    this.adminservice
    .reason_dropdown({ user_num: this.user_num,access_token:this.access_token })
    .subscribe(data => {
      if (data["status"] == 1) {
       this.return_choose=data['result'];
       this.myFormReturn.get('reason').setValue(this.return_choose[0].reason);
       console.log(33);
       
      } 
    });

  }

                // end for reason
  
  // end for rating option
  // end for return
  // track detail
trackStatus(status,name,order_number,awb_no,courier_method_id){
  this.track_more=false;
this.status_flow=status;
this.status_order_number=order_number;
this.status_product_name=name;
this.awb_no=awb_no;
console.log(this.awb_no);
this.courier_method_id=courier_method_id;
// console.log(this.courier_method_id);
// this.awb_no=1430910705434;
// console.log(this.awb_no);
// this.courier_method_id=2;
// console.log(this.courier_method_id);
}
  //track detail
  shipyari_awb_track_lifecycle(){
    this.track_more=false;
    this.adminservice
    .shipyari_awb_track_lifecycle({ user_num: this.user_num,access_token:this.access_token,comp_num:this.comp_num,awb_no:this.awb_no })
    .subscribe(data => {
      if (data["status"] == 1) {
        this.track_more=true;
       this.track=data['result'];
     
       
      } 
    });
  }
  // invoice
compSettingsInvoice() {
    this.adminservice
      .fetch_particular_company_registry_with_sno({ comp_num: sessionStorage.getItem("comp_num_new"),s_no:27 })
      .subscribe(data => {
        if (data["status"] == 1) {

          let d = data['data'];
          let v = d.value;
          if (v == '1') {
            this.invoice_gen = 1;
          }
          
        }
      });
  }
 
  print_invoice(courier_no,dd){
  let checkboxes=true;
  console.log(courier_no);
       let post={
          access_token: this.access_token,
          user_num: this.user_num,
          comp_num: sessionStorage.getItem("comp_num_new"),
          parcel_no:courier_no
        }
         console.log(post);
         if(dd=="single"){
       let y=[];
       y.push(courier_no);
       post['parcel_no']=y;
         }
         else{
          if(courier_no.length==0){
            checkboxes=false;
              alert("No Data");
         
          }
          else{
           let invoice_array=[];
  
            let invoice_check=false;
              for(let i=0;i<courier_no.length;i++){
                 
                  for(let s=0;s<invoice_array.length;s++){
                    if(invoice_array[s]==courier_no[i]['parcel_no']){
                      invoice_check=true;
                    }
                  }
                  if(invoice_check==false){
                    invoice_array.push(courier_no[i]['parcel_no']);
                  }
              }
    
                
    
             post['parcel_no']=invoice_array;
          }
         }
         checkboxes=true;
         console.log(post);
         const formData = new FormData();
         formData.append("comp_num", post.comp_num);
         formData.append("parcel_no", JSON.stringify(post['parcel_no']));
         formData.append("user_num", post.user_num);
         formData.append("access_token", post.access_token);
         console.log(formData);
         if(checkboxes==true){

          console.log(checkboxes);
       this.adminservice.print_invoice(post).subscribe(
         data => {
            console.log(1);
            this.loader = true;
            console.log(data);
           
               console.log(data['body']);
             

               var blob :any= new Blob([data['body']], { type: "application/pdf" });
               console.log(blob);
              saveAs(blob, "invoice.pdf");
             if (data['headers'].get("content-type").search("pdf") != -1) {
              // var blob = new Blob([data['body']], { type: "application/pdf" });
              // saveAs(blob, "invoice.pdf");
            } else {
  
              this.snackbar.open("NO Data Available ", "", {
                duration: 5000
              });
              // this.router
              //   .navigateByUrl("/RefreshComponent", { skipLocationChange: true })
              //   .then(() => this.router.navigate(["Admin/dashboard-reports"]));
            }
  
             
          
}   
,
      error => {
        console.log(error['headers']);
         console.log(error);
      }      
        );
      }
   }
  //print invoice

}

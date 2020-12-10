
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
import { SelectionModel } from "@angular/cdk/collections";
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-order-view-details',
  templateUrl: './order-view-details.component.html',
  styleUrls: ['./order-view-details.component.css']
})
export class OrderViewDetailsComponent implements OnInit {
public orders: any = null;
  // public order_id: any;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  public order_inventory=[];
  public loader=false;
  order_status;
  orderDetails;
  method_method='no';
  entity='single';
  discount_amount;
  total_mrp;
   site;
   parcel_return=[];
   return_choose=[];

  main;
  orderRandomId;
  orderRandomIdResult;
  discount_total_amount;
  previewFlag = sessionStorage.getItem('previewFlag');
  public access_token=sessionStorage.getItem('access_token');
  public user_num=sessionStorage.getItem('user_num');  
  public comp_num_new=sessionStorage.getItem('comp_num_new');  
  public order_id = sessionStorage.getItem('order_id');  
  public  order_item_id=sessionStorage.getItem('order_item_id');  
  public noOrder=true;
  return_policy=false;
  cancel_policy=0;
  minDate = new Date();
  dates:any;
  return_reason=0;

  myFormReturn: FormGroup;
  valuesSplit;
// start split
selectionSplit;
myFormAcceptMulti:FormGroup
 myFormSplit: FormGroup;
 myFormAccept: FormGroup;
 dataSourceSplit;
 displayedColumnsSplit: string[] = [
   "ids",
  
   "ordernos",
   "images",
   "productinfos",
   "quantitys",
   // "mrp",
   
 ];
//end split
 

  constructor(
  	 private snackbar:MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private adminservice: RoarclubserviceService,
    private modalService: NgbModal,
    private fb: FormBuilder) { }
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

     this.orderRandomId = this.route.snapshot.paramMap.get("id");
   
this.adminservice.fetch_order_with_orderrandomid({orderRandomId:this.orderRandomId}).subscribe(
      data => {


       this.loader=true;
        if (data["status"] == "1") {
          
            this.orderRandomIdResult = data["result"];
            this.order_id=this.orderRandomIdResult.order_id;
            this.comp_num_new=this.orderRandomIdResult.comp_num;
           this.sendOrderId(this.orderRandomIdResult.order_id);
            
          } 
          else{
              
          }

      },
      error => {
      }
    );

    // this.adminservice.getOrdersHistory({access_token:this.access_token,user_num:this.user_num,comp_num_new:this.comp_num_new,order_item_id:this.order_item_id,order_id:this.order_id}).subscribe(
    //   data => {

 
    //    this.loader=true;
    //     if (data["status"] == "1") {
          
    //         this.orders = data["result"];
    //         for(let i=0;i<this.orders.length;i++){
    //         	for (let j=0;j<this.orders[i].order_inventory.length;j++){
    //             this.orders[i].order_inventory[j].order_number=this.orders[i].order_number;
    //         		this.order_inventory.push(this.orders[i].order_inventory[j]);
    //         	}

    //         }
    //          this.noOrder=true;
    //         this.loader=true;

           
    //       } else if (data["status"] == "10") {
    //         this.loader=true;
    //         this.router
    //           .navigateByUrl("/RefreshComponent", {
    //             skipLocationChange: true
    //           })
    //           .then(() => this.router.navigate(["/expired"]));
    //       } 
    //       else{
    //           this.noOrder=false;
    //          this.loader=true;
    //       }

    //   },
    //   error => {
    //      this.loader=true;
    //   }
    // );

    this.loader=false;
    // this.getOrdersHistory();
    // this.adminservice.getOrdersDetail({access_token:this.access_token,user_num:this.user_num,comp_num_new:this.comp_num_new,order_item_id:this.order_item_id,order_id:this.order_id}).subscribe(
    //   data => {

        

    //     if (data["status"] == "1") {
    //        this.noOrder=true;
    //         this.orderDetails = data["result"];
    //         this.loader=true;
    //       } else if (data["status"] == "10") {
    //         this.loader=true;
    //         this.router
    //           .navigateByUrl("/RefreshComponent", {
    //             skipLocationChange: true
    //           })
    //           .then(() => this.router.navigate(["/expired"]));
    //       } 
    //       else{
    //          this.loader=true;
    //       }

    //   },
    //   error => {
    //   }
    // );
    this.myFormReturn=this.fb.group({
      reason:[''],
      order_number:[''],
      order_id:[''],
      order_item_id:[''],
      return_comment:[''],
      product_name:['']
    });
    this.compSettings_cancelOption();
    this.compSettings_returnOption();
    this.myFormSplit = this.fb.group({
      order_item_id: this.fb.array([]),
      id: this.fb.array([])
    });
    
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
  sendOrderId(order_id){
  				 this.adminservice.fetch_order_detail_without_token({access_token:this.access_token,user_num:this.user_num,comp_num_new:this.comp_num_new,order_id:this.order_id}).subscribe(
      data => {

        

        if (data["status"] == "1") {
           this.noOrder=true;
            this.orderDetails = data["result"];
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
             this.loader=true;
          }

      },
      error => {
      }
    );
    
  }
  view_product(product_no,quick) {
    if(quick=='N'){
    sessionStorage.setItem("pno", product_no);
    if(this.previewFlag == '1'){
    this.router.navigate(["/Admin/preview/product"]);

    }else{
      this.router.navigate(["/product-view"]);

    }
  }
  }
   view_product2(name, id,slug,quick) {
     let re=" ";
     if(quick=='N'){
    if(this.previewFlag == '1'){
      this.router
      .navigateByUrl("/", {
        skipLocationChange: true
      })
      .then(() => this.router.navigate(["/Admin/preview/product-view", slug]));


    }else{
      this.router
      .navigateByUrl("/", {
        skipLocationChange: true
      })
      .then(() => this.router.navigate(["/product-view", slug]));

    }
   }
  }

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
    this.entity="single";
    var res = confirm("Are you sure you want to cancel this order.");
    if(res){
    var order_item_id=[];
    for(let k=0;k<order_item_id2.length;k++){
      order_item_id.push(order_item_id2.order_inventory[k].order_item_id);
   
    }
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
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(['/my-account/order-history']));          
          
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
  this.entity="single";
   
  this.myFormReturn.get('order_id').setValue(order_id);
 
  this.myFormReturn.get('order_number').setValue(order_number);
  this.parcel_return=order_item_id;
  // this.myFormReturn.get('order_item_id').setValue(order_item_id);
  this.myFormReturn.get('product_name').setValue(product_name);
  

}
  update_return_initiate(){
    var flag=0;
    var post;
    var flag2=1;
    if(this.entity!='single'){
      flag=1;
    }
      if (this.myFormReturn.invalid ) {
        this.snackbar.open("* fields are required. ", "", {
          duration: 3000
        });
        

      }  
      else{
        var order_item_id=[];
        if(flag==0){
        
          for(let k=0;k<this.parcel_return.length;k++){
            order_item_id.push(this.parcel_return[k].order_item_id);
        
          }
           post= { comp_num: sessionStorage.getItem("comp_num_new"),
              
                  user_num:this.user_num,
                access_token:this.access_token,
                order_inventories:order_item_id,
                return_comment:this.myFormReturn.controls.return_comment.value,
                reason:this.myFormReturn.controls.reason.value,
                order_id:this.myFormReturn.controls.order_id.value

                };
                flag2=1;
        }
        else{
          console.log(this.myFormSplit.value["order_item_id"]);

          if(this.myFormSplit.value["order_item_id"].value.length==0){
            alert("Please select checkboxes");
            flag2=0;
          }
         else{
                 post= { comp_num: sessionStorage.getItem("comp_num_new"),
              
                        user_num:this.user_num,
                      access_token:this.access_token,
                      order_inventories:this.myFormSplit.value["order_item_id"],
                      return_comment:this.myFormReturn.controls.return_comment.value,
                      reason:this.valuesSplit.parcel_no,
                      order_id:this.valuesSplit.order_id
              
                      };
              flag2=1;
            
        
          
         }
      }
      if(flag2==1){
    // order_item_id.push(this.myFormReturn.controls.order_item_id.value);
      this.adminservice
      .update_return_initiate(
       post
        )
      .subscribe(data => {
        if (data["status"] == 1) {
          this.modalService.dismissAll('Save click');
          this.snackbar.open('This order is ready to return. ','' ,{
            duration: 3000,
            horizontalPosition:'center',
        }); 
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(['/my-account/order-history']));          
          
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
  CancelSelected(myForm){
    console.log(this.myFormSplit.value);
    console.log(this.myFormSplit.value["order_item_id"]);
   
   
    console.log(myForm["order_item_id"]);
    console.log(myForm.order_item_id);
    console.log(this.myFormSplit.controls.order_item_id);
     if(myForm["order_item_id"].length==0){
  alert("Please select checkboxes");
      }
      else{
    

      var res = confirm("Are you sure you want to cancel this order.");
      if(res){
      
        this.adminservice
        .cancel_order_by_user(
          { comp_num: sessionStorage.getItem("comp_num_new"),
          
          user_num:this.user_num,
        access_token:this.access_token,
        order_inventories:myForm["order_item_id"],
        parcel_no:this.valuesSplit.parcel_no,
        order_id:this.valuesSplit.order_id
  
        }
          )
        .subscribe(data => {
          if (data["status"] == 1) {
           
            this.snackbar.open('This order is cancel. ','' ,{
              duration: 3000,
              horizontalPosition:'center',
          }); 
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
          this.router.navigate(['/my-account/order-history']));          
            
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
      
  }
  return_startSplit(){

  }
  parcelsSplit(parcel,method,entity2){
this.method_method=method;
this.entity=entity2;
    // this.parcel_details = parcel;
    this.valuesSplit=parcel;
    this.selectionSplit = new SelectionModel(true, []);
    // this.valuesSplit.parcel_no=parcel.parcel_no 
this.dataSourceSplit = new MatTableDataSource(this.valuesSplit.order_inventory);
      this.dataSourceSplit.sort = this.sort; 
      this.masterToggleSplit(true);

      var emailFormArray = <FormArray>this.myFormSplit.controls.order_item_id;
console.log(emailFormArray)
  for (let z=0;z<this.valuesSplit.order_inventory.length;z++) {
    console.log(this.valuesSplit.order_inventory[z].order_item_id);

    emailFormArray.push(new FormControl(this.valuesSplit.order_inventory[z].order_item_id));
  }
  }
   // start split
isAllSelectedSplit() {
  var numSelected = this.selectionSplit.selected.length;
  var numRows = this.dataSourceSplit.data.length;
  return numSelected === numRows;
}

 removeCheckWithoutClearSplit() {
  var emailFormArray2 = <FormArray>this.myFormSplit.controls.order_item_id;
  for (var i = 0; i < this.valuesSplit.length; i++) {
    let index = emailFormArray2.controls.findIndex(
      x => x.value == this.valuesSplit[i].order_item_id
    );
    emailFormArray2.removeAt(index);

  }
  //console.log(emailFormArray2);
}
onChangeDemoSplit(order_item_id: string, isChecked: boolean) {
  var emailFormArray = <FormArray>this.myFormSplit.controls.order_item_id;

  if (isChecked) {
    emailFormArray.push(new FormControl(order_item_id));
  } else {
    let index = emailFormArray.controls.findIndex(x => x.value == order_item_id);
    emailFormArray.removeAt(index);
  }
  //console.log(emailFormArray);
}

masterToggleSplit(isChecked: boolean) {
  this.isAllSelectedSplit()
    ? this.removeCheckSplit()
    : this.dataSourceSplit.data.forEach(row => this.selectionSplit.select(row));

  var emailFormArray2 = <FormArray>this.myFormSplit.controls.order_item_id;
  if (isChecked) {
    // code...

    this.removeCheckWithoutClearSplit();

    for (var i = 0; i < this.valuesSplit.length; i++) {
      emailFormArray2.push(new FormControl(this.valuesSplit[i].order_item_id));
    }
  } else {
    this.removeCheckSplit();
  }
  //console.log(emailFormArray2);
}

removeCheckSplit() {
  this.selectionSplit.clear();
  var emailFormArray = <FormArray>this.myFormSplit.controls.order_item_id;
  for (var i = 0; i < this.valuesSplit.length; i++) {
    let index = emailFormArray.controls.findIndex(
      x => x.value == this.valuesSplit[i].order_item_id
    );
    emailFormArray.removeAt(index);

  }
  //console.log(emailFormArray);
}
// end split

}

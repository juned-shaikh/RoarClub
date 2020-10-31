
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RoarclubserviceService } from "../roarclubservice.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-order-view-details',
  templateUrl: './order-view-details.component.html',
  styleUrls: ['./order-view-details.component.css']
})
export class OrderViewDetailsComponent implements OnInit {
public orders: any = null;
  // public order_id: any;
  public order_inventory=[];
  public loader=false;
  order_status;
  orderDetails;
  discount_amount;
  total_mrp;
   site;
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
  constructor(
  	 private snackbar:MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private adminservice: RoarclubserviceService,
    private modalService: NgbModal,) { }
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
}

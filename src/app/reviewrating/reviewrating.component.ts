import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { RoarclubserviceService } from "../roarclubservice.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router, ActivatedRoute } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { Location } from "@angular/common";
@Component({
  selector: 'app-reviewrating',
  templateUrl: './reviewrating.component.html',
  styleUrls: ['./reviewrating.component.css']
})
export class ReviewratingComponent implements OnInit {
rate=true;
product;
registerForm2: FormGroup;
@Input() rating: number;
@Input() itemId: number;
@Output() ratingClick: EventEmitter<any> = new EventEmitter<any>();

  inputName: string;
  ratingdone = false;
  constructor(
  	 private snackbar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
       private formBuilder: FormBuilder,
       private location :Location,
    private adminservice: RoarclubserviceService,
    ) { }

  ngOnInit() {
    this.inputName = this.itemId + '_rating';
  	if(sessionStorage.getItem("rating")=="1"){
  		this.rate=true;

  	}
  	else{
  		this.rate=false;

  	}
    this.getProduct();
    this.fetchParticularUserReview();
  	this.registerForm2 = this.formBuilder.group({
      
      review_message: [""],

      product_no: sessionStorage.getItem("product_rating"), 
      user_num: sessionStorage.getItem("user_num"),
      comp_num: sessionStorage.getItem("comp_rating"),
      access_token: sessionStorage.getItem("access_token")
    });
  }
  fetchParticularUserReview(){
    let pro = { 
      product_no: sessionStorage.getItem("product_rating"), 
      user_num: sessionStorage.getItem("user_num"),
      comp_num: sessionStorage.getItem("comp_rating"),
      access_token: sessionStorage.getItem("access_token")
    
    };
    this.adminservice.fetch_user_product_reviews(pro).subscribe(
      data => {
        if (data["status"] == 1) {
          this.rating = parseInt(data['result'].ratings);
          this.registerForm2.get('review_message').setValue(data['result'].review_message);
          
          
        } else if (data["status"] == 10) {
        } else if (data["status"] == 0) {
        }
      },
      error => {
        this.snackbar.open("Something Went wrong please try again. ", "", {
          duration: 3000
        });
      }
    );

  }
  insertReview(e) {
  	let post={
  		user_num: sessionStorage.getItem("user_num"),
        access_token: sessionStorage.getItem("access_token"),
        comp_num: sessionStorage.getItem("comp_rating"),
         product_no: sessionStorage.getItem("product_rating"),
         ratings:e
     }
    this.adminservice
      .insertReview(post)
      .subscribe(data => {
        if (data["status"] == 1) {
         
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
        }
      });
  }
insertMessage() {
  	 let data2 = this.registerForm2.value;

    this.adminservice
      .insertReview(data2)
      .subscribe(data => {
        if (data["status"] == 1) {
        	 this.snackbar.open("Your review is successfully submitted ", "", {
          duration: 3000
        });
        this.location.back();
         
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
        }
      });
  }
  getProduct() {
    let pro = { product_no: sessionStorage.getItem("product_rating"),comp_num:sessionStorage.getItem("comp_rating") };
    this.adminservice.viewProduct(pro).subscribe(
      data => {
        if (data["status"] == 1) {
          this.product = data["product"];
         
          // end similar product
        } else if (data["status"] == 10) {
        } else if (data["status"] == 0) {
        }
      },
      error => {
        this.snackbar.open("Something Went wrong please try again. ", "", {
          duration: 3000
        });
      }
    );
  }
  onClick(rating: number): void {
    this.rating = rating;
    this.ratingClick.emit({
      itemId: this.itemId,
      rating: rating
    });
    let post={
  		user_num: sessionStorage.getItem("user_num"),
        access_token: sessionStorage.getItem("access_token"),
        comp_num: sessionStorage.getItem("comp_rating"),
         product_no: sessionStorage.getItem("product_rating"),
         ratings:rating
     }
    this.adminservice
      .insertReview(post)
      .subscribe(data => {
        if (data["status"] == 1) {
          this.ratingdone = true;
         
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
        }
      });
  }
  
}
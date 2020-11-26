


import { Component,OnInit } from '@angular/core';

interface ICompany {
  id: number;
  rating: number;
  contact: string;
  company: string;
}
@Component({
  selector: 'app-rating-now',
  templateUrl: './rating-now.component.html',
  styleUrls: ['./rating-now.component.css']
})
export class RatingNowComponent implements OnInit {
  
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }

  ratingClicked: number;
  itemIdRatingClicked: string;
  items: ICompany[] = [
    { 'id': 1, 'rating': 1, 'contact': 'Morgan Mccarthy', 'company': 'CENTREXIN' },
    { 'id': 2, 'rating': 2, 'contact': 'Brady Craft', 'company': 'JIMBIES' },
   
  ];
  ratingComponentClick(clickObj: any): void {
    const item = this.items.find(((i: any) => i.id === clickObj.itemId));
    if (!!item) {
      item.rating = clickObj.rating;
      this.ratingClicked = clickObj.rating;
      this.itemIdRatingClicked = item.company;
    }

  }
}

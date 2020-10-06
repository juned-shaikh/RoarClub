import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

// // start
// var Application = {
//   SampleShop: angular.module('SampleShop', [])
// };

// Application.Controllers = {};

// // Sample
// var sampleFilters = [
//   { id: 1, name: "Color", properties: [
//     { id: 13, name: "Blue", selected: false },
//     { id: 34, name: "Red", selected: false },
//     { id: 104, name: "Green", selected: false }
//   ] },
//   { id: 2, name: "Material", properties: [
//     { id: 49, name: "Rubber", selected: false },
//     { id: 74, name: "Cotton-polyester", selected: false },
//     { id: 93, name: "Textile", selected: false }
//   ] }
// ];
// var sampleProducts = [
//   {
//     id: 1,
//     name: "Product 1",
//     image: "http://shopping-all.hu/images/d4/43eb/d443eb26e212c3db30f06b5dc9dd97a11349684224_180x180.jpg",
//     price: 12400,
//     properties: [ '1-13', '2-49' ]
//   },
//   {
//     id: 2,
//     name: "Product 2",
//     image: "http://shopping-all.hu/images/08/a714/08a71407d050c14df049e22b899f4a991349684236_180x180.jpg",
//     price: 21000,
//     specialPrice: 15000,
//     properties: [ '1-13', '2-74' ]
//   },
//   {
//     id: 3,
//     name: "Product 3",
//     image: "http://shopping-all.hu/images/b1/ab32/b1ab32886aede68ff44259af6d3364ca1349684221_180x180.jpg",
//     price: 2400,
//     properties: [ '1-34', '2-93' ]
//   },
//   {
//     id: 4,
//     name: "Product 4",
//     image: "http://shopping-all.hu/images/c2/2e53/c22e53b8c37f29b464f5fddfcb30d4031350547387_180x180.jpg",
//     price: 14130,
//     specialPrice: 9900,
//     properties: [ '1-104', '2-93' ]
//   },
//   {
//     id: 5,
//     name: "Product 5",
//     image: "http://shopping-all.hu/images/6f/f98c/6ff98cf2d900760450d76a0b15624c6f1350547398_180x180.jpg",
//     price: 33210,
//     properties: [ '1-104', '2-74' ]
//   },
// ];
// // Sample::end




// Application.Controllers.Category = (function(app) {
//   var ProductList = function($scope) {
//     $scope.filters = [];
//     $scope.products = [];
    
//     // get filters
//     (function() {
//       $scope.filters = sampleFilters;
//     })();
//     // get products
//     (function() {
//       $scope.products = sampleProducts;
//     })();
    
//     $scope.selectUnselect = function(filter, property) {
//       property.selected = !property.selected;
      
//       if (property.selected) {
//         // add to selected
//       } else {
//         // remove from selected
//       }
//     };
//   };
//   return {
//     ProductList: ProductList
//   };
// })(Application);
// end


}

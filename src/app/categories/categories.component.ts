import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  
  products:Product[] = [];
  category!:String;
  splitCategory:String="";
  subCategory:String="";
  hasSubCategory:boolean = false;

  constructor(private productService : ProductService, private router : Router) { }

  ngOnInit(): void {
    this.products = this.productService.categoricalProducts;
    this.category = this.productService.getCategory();

    for (let index = 0; index < this.category.length; index++) {
      if(this.category[index]==',')
      {
        this.hasSubCategory = true;
        continue;
      }
      if(this.hasSubCategory)
      {
        this.subCategory += this.category[index];
      }
      else
      {
        this.splitCategory += this.category[index];
      }
      
    }
    console.log(this.splitCategory);
    console.log(this.subCategory);

  }
  showProduct(product:Product){
    this.productService.setProductToBeShown(product);
    this.router.navigate(['product']);
  }

  showBidProduct(product:Product){
    this.productService.setBidProductToBeShown(product);
    this.router.navigate(['bid']);
  } 
  getCategoricalProducts(category : String){
    var reqData = {
      category : category
    }
    this.productService.setCategory(category);
    this.productService.getCategoricalProducts(reqData).subscribe(data=>{
      this.products = data;
      console.log(this.products)
      this.productService.categoricalProducts = this.products;
      if(this.router.url == "/category"){
        console.log("we are here:" +this.router.url);
        let currentUrl = this.router.url;
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
        });
      }
      else {
        this.router.navigate(['category']);
      }
    });
    
  }
}

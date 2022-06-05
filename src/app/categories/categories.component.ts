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
  constructor(private productService : ProductService, private router : Router) { }

  ngOnInit(): void {
    this.products = this.productService.categoricalProducts;
  }
  showProduct(product:Product){
    this.productService.setProductToBeShown(product);
    this.router.navigate(['product']);
  }

  showBidProduct(product:Product){
    this.productService.setBidProductToBeShown(product);
    this.router.navigate(['bid']);
  } 
}

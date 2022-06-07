import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-admin-productlist',
  templateUrl: './admin-productlist.component.html',
  styleUrls: ['./admin-productlist.component.css']
})
export class AdminProductlistComponent implements OnInit {

  products:Product[] = []
  approve_products:Product[]=[]
  disapprove_products:Product[]=[]
  constructor(private productService:ProductService,private router:Router) { }

  ngOnInit(): void {

    this.getProducts()
  }
  getProducts(){
    this.productService.getAllProducts().subscribe(data=>{
      this.products = data;

      for(let product of this.products)
      {
        if(product.isApproved)
        {
          this.approve_products.push(product);
        }
        else{
          this.disapprove_products.push(product);
        }
      }

    });
  }
  verify(product : Product)
  {
    product.isApproved = true;

  }
  viewProduct(product:Product)
  {
    this.productService.setProductToBeShown(product);
    this.router.navigate(['admin-productDetails', product.uid]);
  }

}

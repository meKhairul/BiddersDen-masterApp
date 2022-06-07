import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { flatMap } from 'rxjs';
import { Bid } from '../bid';
import { Emitters } from '../emiiters/Emitter';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin-product-details',
  templateUrl: './admin-product-details.component.html',
  styleUrls: ['./admin-product-details.component.css']
})
export class AdminProductDetailsComponent implements OnInit {

  productShow = this.productService.getAdminUpdateProduct();
  user = this.userService.getUser();
  newBid = new Bid();
  currentBids : Bid[] = [];
  authenticated:boolean = false;

  constructor(private productService:ProductService, private userService: UserService,private router:Router) { }

  ngOnInit(): void {
    
    this.getBids();
    if(this.user.username !=null)
    {
      this.authenticated = true;
    }
  }
  

  
  getBids(){
    this.productService.getBids(this.productShow).subscribe(data=>{
      this.currentBids = data;
      console.log(this.currentBids);
    });
  }
  showBidProduct()
  {
    if(this.authenticated)
    {
      this.productService.setBidProductToBeShown(this.productShow);
      this.router.navigate(['bid']);
    }
    else
    {
      alert("You are not allowed to bid.Please sign in first!!");
    }
  }
  
  update(product:Product)
  {
    this.productService.setAdminUpdatedProduct(product);
    this.router.navigate(['admin-updateProduct']);
  }

}

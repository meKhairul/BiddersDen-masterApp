import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bid } from '../bid';
import { Emitters } from '../emiiters/Emitter';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productShow = this.productService.getProductToBeShown();
  user !:any;
  newBid = new Bid();
  currentBids : Bid[] = [];
  authenticated :boolean = false;

  constructor(private productService:ProductService, private userService: UserService,private router:Router) { }

  ngOnInit(): void {
    Emitters.authEmitter.subscribe(
      (auth: boolean) => {
        this.authenticated = auth; 
        this.user = this.userService.getUser();
      }

    );
    this.getBids();
  }
  addBid(){
    this.newBid.bidderId = this.user.username;
    this.newBid.productId = this.productShow.uid;
    this.newBid.bidAmount = 500;
    this.productService.setBid(this.newBid).subscribe(response=>{
      alert(response.toString())
    });
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

  


}

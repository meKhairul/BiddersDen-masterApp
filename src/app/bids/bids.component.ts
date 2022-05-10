import { Component, OnInit } from '@angular/core';
import { Bid } from '../bid';
import { ProductService } from '../product.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-bids',
  templateUrl: './bids.component.html',
  styleUrls: ['./bids.component.css']
})
export class BidsComponent implements OnInit {

  clicked : number = 0;
  bid_price : number = 0;
  bids : number[] = [];
  user = this.userService.getUser()
  newBid = new Bid();
  currentBids : Bid[] = [];
  current_date : Date = new Date();
  
  productShow = this.productService.getBidProductToBeShown();
  
  minBid = Math.max(this.productShow.base_price,5);
  constructor(private productService:ProductService,private userService:UserService) { 
    
    this.productShow.current_price = this.productShow.base_price;
    for(let i=this.minBid;this.bids.length<=50;i+=(this.minBid/10))
    {
      
      this.bids.push(i);
      
    }
    
  }

  ngOnInit(): void {
    
  }

  makeBid()
  {
    this.newBid.bidderId = this.user.username;
    this.newBid.productId = this.productShow.uid;
    this.newBid.bidAmount = this.productShow.current_price + parseInt(this.bid_price.toString(),10);
    this.productShow.current_price = this.productShow.current_price + parseInt(this.bid_price.toString(),10);
    this.productService.setBid(this.newBid).subscribe(response=>{
      alert(response.toString())
    });
    console.log("Bid price: "+this.bid_price);
    console.log("current price: "+this.productShow.current_price);
    console.log("today : "+this.current_date);
  }

  getBids(){
    if(this.clicked)this.clicked = 0;
    else this.clicked=1;
    this.productService.getBids(this.productShow).subscribe(data=>{
      this.currentBids = data;
      this.currentBids = this.currentBids.sort((a, b) => 0-(a.bidAmount - b.bidAmount));
      console.log(this.currentBids);
    });

    console.log(JSON.stringify(this.currentBids));

  }

}

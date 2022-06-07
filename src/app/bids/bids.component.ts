
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
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
  bid_price !: number;
  bids : number[] = [];
  user = this.userService.getUser()
  newBid = new Bid();
  currentBids : Bid[] = [];
  current_date : Date = new Date();
  
  productShow = this.productService.getBidProductToBeShown();
  
  minBid = Math.max(this.productShow.current_price,5);
  constructor(private productService:ProductService,private userService:UserService,private router:Router) { 
    
    
    for(let i=this.minBid;this.bids.length<=50;i+=(this.minBid/10))
    {
      if(i==this.minBid)continue;
      this.bids.push(Math.round(i));
      
    }
    
  }

  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
  });
  }

  makeBid()
  {

    if(this.bid_price<=this.minBid)
    {
      alert("You can't bid less than current price!!");
    }
    else{
    this.newBid.bidderId = this.user.username;
    this.newBid.productId = this.productShow.uid;
    this.newBid.bidAmount = parseInt(this.bid_price.toString(),10);
    this.productShow.current_price = parseInt(this.bid_price.toString(),10);
    this.productService.setBid(this.newBid).subscribe(response=>{
      alert(response.toString())
    });
    
    this.productService.createEvent('bid', this.user.username, this.productShow).subscribe(data=>{
      console.log(data);
    });
    console.log("Bid price: "+this.bid_price);
    console.log("current price: "+this.productShow.current_price);
    console.log("today : "+this.current_date);
  }
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
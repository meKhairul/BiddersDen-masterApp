
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Bid } from '../bid';
import { Emitters } from '../emiiters/Emitter';
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
  user!:any;
  newBid = new Bid();
  currentBids : Bid[] = [];
  current_date : Date = new Date();
  id!:any;
  productShow = this.productService.getBidProductToBeShown();
  
  minBid = Math.max(this.productShow.current_price,5);
  constructor(private productService:ProductService,private userService:UserService,private router:Router,private aroute:ActivatedRoute) { 
    
    
    for(let i=this.minBid;this.bids.length<=50;i+=(this.minBid/10))
    {
      if(i==this.minBid)continue;
      this.bids.push(Math.round(i));
      
    }
    
  }
  isBangla : boolean = false;
  authenticated : boolean = false;

  ngOnInit(): void {
    this.isBangla = this.userService.getIsBangla();
    Emitters.authEmitter.subscribe(
      (auth: boolean) => {
        this.authenticated = auth; 
        this.user = this.userService.getUser();
      }

    );
    this.authenticate();
    this.user = this.userService.getUser()
    this.id = this.aroute.snapshot.paramMap.get('id');
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      
      window.scrollTo(0, 0)
  });
  this.getProductDetails(this.id);
  
  }

  authenticate(){
    this.userService.authenticate().subscribe(response => {
      this.user = response;
      this.userService.setUser(this.user);
      
     
      //alert("Logged In as .. " + String(this.userdata.username) )
      Emitters.authEmitter.emit(true);
    },
    err => {
      //alert("not Logged In")
      Emitters.authEmitter.emit(false);
    }
  );
  }

  getProductDetails(id : string){
    this.productService.getProductDetails(id).subscribe(data=>{
      this.productShow = data;
      if(this.router.url == "/bid/"+"id"){
        console.log("we are here:" +this.router.url);
        let currentUrl = this.router.url;
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
        });
      }
      else {
        this.router.navigate(['bid',id]);
      }
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
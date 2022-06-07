import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { flatMap } from 'rxjs';
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
  user = this.userService.getUser();
  newBid = new Bid();
  currentBids : Bid[] = [];
  authenticated:boolean = false;
  id!:any;

  constructor(private productService:ProductService, private userService: UserService,private router:Router,private aroute:ActivatedRoute) { }

  ngOnInit(): void {
    
    this.id = this.aroute.snapshot.paramMap.get('id');
    console.log(this.id); 
    Emitters.authEmitter.subscribe(
      (auth: boolean) => {
        this.authenticated = auth; 
        this.user = this.userService.getUser();
      }
    );
    this.getProductDetails(this.id);
    this.getBids();
  }
  

  getProductDetails(id : string){
    this.productService.getProductDetails(id).subscribe(data=>{
      this.productShow = data;
    });
  }
  
  getBids(){
    this.productService.getBids(this.productShow).subscribe(data=>{
      this.currentBids = data;
      console.log(this.currentBids);
    });
  }
  showBidProduct(product:Product)
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
    this.router.navigate(['bid', product.uid]);
  }

  


}

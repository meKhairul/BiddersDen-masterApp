import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Emitters } from '../emiiters/Emitter';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  date : Date = new Date();
  day!:any;
  hour!:any;
  ampm!:any;
  mins!:any;
  sec!:any;
  daysArray = ["Sunday","Monday","Tuesday","Wednesday","Thurshday","Friday","Saturday"];
  userdata!: any;
  products: Product[]=[];
  link:string[] = [];
  isdrop:number=0;
  authenticated : boolean = false;
  constructor(private userService:UserService,private productService:ProductService,private router:Router) { }

  ngOnInit(): void {
    setInterval(()=>{
      const date = new Date();
      this.updateDate(date);

      

    },1000);
    this.day = this.daysArray[this.date.getDay()];
    Emitters.authEmitter.subscribe(
      (auth: boolean) => {
        this.authenticated = auth; 
        this.userdata = this.userService.getUser();
      }

    );
    this.authenticate();
    this.getProducts();
  }
  authenticate(){
    this.userService.authenticate().subscribe(response => {
      this.userdata = response;
      this.userService.setUser(this.userdata);
      //alert("Logged In as .. " + String(this.userdata.username) )
      Emitters.authEmitter.emit(true);
    },
    err => {
      //alert("not Logged In")
      Emitters.authEmitter.emit(false);
    }
  );
  }
  getProducts(){
    this.productService.getAllProducts().subscribe(data=>{
      this.products = data;
    });
  }

  showProduct(product:Product){
    this.productService.setProductToBeShown(product);
    this.router.navigate(['product']);
  }

  showBidProduct(product:Product){

    console.log(this.validTime());
    console.log(this.hour);
    if(this.authenticated && this.validTime())
    {
      this.productService.setBidProductToBeShown(product);
      this.router.navigate(['bid']);
    }
    else if(this.authenticated==false)
    {
      alert("You are not allowed to bid.Please sign in first!!");
    }
    else{
      alert("Bidding is not started yet!!");
    }

    
  }
  
  sorting(sortValue:number)
  {
    this.productService.setSortValue(sortValue);
    this.router.navigate(['sort']);
  }
  drop()
  {
    if(this.isdrop==0)
    {
      this.isdrop=1;
    }
    else
    {
      this.isdrop=0;
    }
  }

  validTime():boolean
  {
    
    if(this.hour>=9 && this.hour<=23 )
    {
      return true;
    }
    else
    {
      return false;
    }

  }
  updateDate(date:Date)
  {
    const hours = date.getHours();
    
    this.hour = hours;

    const minutes = date.getMinutes();

    this.mins = minutes;

    const seconds = date.getSeconds();

    this.sec = seconds;

  }

}

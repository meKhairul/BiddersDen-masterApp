import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Emitters } from '../emiiters/Emitter';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private userService:UserService,private productService:ProductService,private router:Router) { }

  isdrop:boolean = false;
  products : Product[] = [];
  isBidAble :boolean = true;
  rday!:any;
  rhour!:any;
  rampm!:any;
  rmins!:any;
  rsec!:any;

  authenticated : boolean = false;
  userdata!: any;

  ngOnInit(): void {
    setInterval(()=>{
      const date = new Date();
      this.myTimer(date);
      
    },1000);
    Emitters.authEmitter.subscribe(
      (auth: boolean) => {
        this.authenticated = auth; 
        this.userdata = this.userService.getUser();
      }

    );
    this.authenticate();
    this.getProducts();
  }
  drop()
  {
    if(this.isdrop==false)
    {
      this.isdrop=true;
    }
    else
    {
      this.isdrop=false;
    }
  }
  login()
  {
    this.router.navigate(['signup']);
  }

  myTimer(date:Date) {
    
    const d = new Date();
    d.setHours(23);
    d.setMinutes(59);
    d.setSeconds(59);
    
    d.setMilliseconds(999);
    //console.log(date);
    let difference = d.getTime() - date.getTime();
    if(difference<=0 && date.getHours()<=9)
    {
      this.isBidAble = false;
      this.userService.setIsBidAble(this.isBidAble);
      //console.log("Its time to close");
    }
    else
    {
      this.isBidAble = true;
      this.userService.setIsBidAble(this.isBidAble);
    }
    this.rsec = Math.floor(difference / 1000);
    this.rmins = Math.floor(this.rsec / 60);
    this.rhour = Math.floor(this.rmins / 60);
    this.rday = Math.floor(this.rhour / 24);

    this.rhour %= 24;
    this.rmins %= 60;
    this.rsec %= 60;
    this.rhour = this.rhour < 10 ? '0' + this.rhour : this.rhour;
    this.rmins = this.rmins < 10 ? '0' + this.rmins : this.rmins;
    this.rsec = this.rsec < 10 ? '0' + this.rsec : this.rsec;

    //console.log(this.rhour+":"+this.rmins+":"+this.rsec);

    
  }
  getCategoricalProducts(category : String){
    var reqData = {
      category : category
    }
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
    if(this.authenticated) {
      this.productService.createEvent('view', this.userdata.username, product).subscribe(data=>{
      console.log(data);
      });
    }
  }

  showBidProduct(product:Product){

    
    if(this.authenticated && this.isBidAble)
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
    if(this.authenticated) {
      this.productService.createEvent('view', this.userdata.username, product).subscribe(data=>{
      console.log(data);
      });
    }
    
  }
  sorting(val : number)
  {
    this.productService.getAllProducts().subscribe(data=>{
      this.products = data;
      
      if(val==0){
        this.products = this.products.sort((a, b) => 0-(a.current_price - b.current_price)); 
      }
      else if(val==1)
      {
        console.log(val);
        this.products = this.products.sort((a, b) => (a.current_price > b.current_price?1:-1));
      }
      else if(val==2)
      {
        this.products = this.products.sort((a, b) => (a.product_name > b.product_name?1:-1));
      }
      else if(val==3)
      {
        this.products = this.products.sort((a, b) => (a.recieved_date > b.recieved_date?1:-1));
      }
      console.log(this.products);
    });
    
  }
  
}

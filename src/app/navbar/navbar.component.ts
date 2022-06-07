import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Emitters } from '../emiiters/Emitter';
import { Notify } from '../notify';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { User } from '../user';
import { UserService } from '../user.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  
  constructor(private userService:UserService, private productService: ProductService, private router:Router) { }

  click = 1;
  isBidAble :boolean = true;
  user !:any;
  products : Product[] = [];
  searchData!:String;
  flag!:number;
  date : Date = new Date();
  day!:any;
  hour!:any;
  ampm!:any;
  mins!:any;
  sec!:any;
  rday!:any;
  rhour!:any;
  rampm!:any;
  rmins!:any;
  rsec!:any;
  one:boolean=true;
  winningProducts:Product[] = [];
  daysArray = ["Sunday","Monday","Tuesday","Wednesday","Thurshday","Friday","Saturday"];

  
  menuButtonClickEvent() {
    if (this.click == 0) this.click = 1;
    else this.click = 0;
  }

  
  authenticated = false;
  notification:Notify[] = [];
  newNotify:Notify = new Notify();
  ngOnInit(): void {
    this.getProducts();
    Emitters.authEmitter.subscribe(
      (auth: boolean) => {
        this.authenticated = auth; 
        
      }

    );
    this.authenticate();
    setInterval(()=>{
      const date = new Date();
      this.updateDate(date);
    },1000);
    this.day = this.daysArray[this.date.getDay()];

    setInterval(()=>{
      const date = new Date();
      this.myTimer(date);
    },1000);
    setInterval(()=>{
      //console.log(this.isBidAble);
      //console.log(this.one);
      if(!this.isBidAble && this.one)
      {
        this.one=false;
        this.winOrNot();
        //console.log(this.winningProducts);
        this.userService.setWinnerProducts(this.winningProducts);
        this.newNotify.type = 'win';
        this.newNotify.msg = 'Congratulations!! Yoy have won the bid/s. Click the Link to Pay for getting the product.';
        this.newNotify.time = this.date;
        this.notification.push(this.newNotify);
        
      }
      
    },1000);
  }

  authenticate(){
    this.userService.authenticate().subscribe(response => {
      this.user = response;
      
      //alert("Logged In as .. " + String(this.userdata.username) )
      Emitters.authEmitter.emit(true);
    },
    err => {
      //alert("not Logged In")
      Emitters.authEmitter.emit(false);
    }
  );
  }

 
  login()
  {
    this.router.navigate(['../signin']);
    
  }
  
  logout(): void {
    this.userService.logout().subscribe(() => this.authenticated = false);
    this.user = new User();
  }

  toggle()
  {
    if(this.authenticated)
    {
      this.router.navigate(['userprofile']);
    }
    else
    {
      console.log("You must sign in first");
    }
  }
  
  search(searchData:String,flag:number){
    var searchText = { text : searchData}
    console.log(this.searchData);
    this.productService.searchProducts(searchText).subscribe(data=>{
      this.products = data;
      this.productService.setSearchTextProducts(this.products);
      this.productService.setSearchText(searchData);
      this.productService.setFlag(flag);
      if(this.router.url == "/search"){
        
        console.log("we are here:" +this.router.url);
        let currentUrl = this.router.url;
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
      }
      else {this.router.navigate(['search']);}
      
    
      console.log(this.products)
    });
  }

  sorting(sortValue:number)
  {
    this.productService.setSortValue(sortValue);
    if(this.router.url == "/sort"){
        
      console.log("we are here:" +this.router.url);
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
  });
    }
    else {this.router.navigate(['sort']);}
    
  }

  updateDate(date:Date)
  {
    const hours = date.getHours();
    this.ampm = hours>12?"PM":"AM";
    this.hour = hours%12;
    this.hour = this.hour?this.hour:12;
    this.hour = this.hour < 10 ? '0' + this.hour : this.hour;

    const minutes = date.getMinutes();

    this.mins = minutes<10?'0'+minutes:minutes.toString();

    const seconds = date.getSeconds();

    this.sec = seconds<10?'0'+seconds:seconds.toString();



  }
  getProducts(){
    this.productService.getAllProducts().subscribe(data=>{
      this.products = data;
    });
  }
  
  winOrNot()
  {
    
    for(let product of this.products)
    {
      //console.log(product);
      this.productService.getBids(product).subscribe(data=>{
        let currentBids = data;
        currentBids = currentBids.sort((a, b) => 0-(a.bidAmount - b.bidAmount));
        
        
        if(currentBids[0].bidderId==this.user.username)
        {
          this.winningProducts.push(product);
        }
        

        

      });
    }
    
    
  }
  myTimer(date:Date) {
    
    const d = new Date();
    d.setHours(23);
    d.setMinutes(59);
    d.setSeconds(59);
    
    d.setMilliseconds(999);
    //console.log(date);
    let difference = d.getTime() - date.getTime();
    if(difference<=0)
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
  sendNotify(notify:Notify)
  {
    if(notify.type=='win')
    {
      this.router.navigate(['payment']);
    }
  }
  getCategoricalProducts(category : String){
    var reqData = {
      category : category
    }
    this.productService.setCategory(category);
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

}

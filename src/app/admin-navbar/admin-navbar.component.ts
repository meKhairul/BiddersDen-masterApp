import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Emitters } from '../emiiters/Emitter';
import { Notify } from '../notify';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {


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

  
 

  
  authenticated = false;
  notification:Notify[] = [];
  newNotify:Notify = new Notify();
  userdata!:any;
  
  constructor(private userService:UserService,private router:Router) { }

  ngOnInit(): void {
    Emitters.authEmitter.subscribe(
      (auth: boolean) => {
        this.authenticated = auth; 
        this.userdata = this.userService.getUser();
      }

    );
    this.authenticate();
    
  }

  authenticate(){
    this.userService.authenticate().subscribe(response => {
      this.userdata = response;
      this.userService.setUser(this.userdata);
      
      if(this.userdata.username!='biddersden')
    {
      this.router.navigate(['']);
    }
      //alert("Logged In as .. " + String(this.userdata.username) )
      Emitters.authEmitter.emit(true);
    },
    err => {
      //alert("not Logged In")
      Emitters.authEmitter.emit(false);
    }
  );
  }

  logout(): void {
    this.userService.logout().subscribe(() => this.authenticated = false);
    this.user = new User();
    this.router.navigate(['../signin']);
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
  
  
  
  


}

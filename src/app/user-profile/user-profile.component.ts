import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Emitters } from '../emiiters/Emitter';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  
  totalSells : number = 12;
  totalBuys !: any;
  totalIncome : number = 20000;
  totalMoneySpent:number = 550000;
  recentBids!:any;
  show :number = 0;
  click : boolean = false;
  constructor(private userService: UserService,private router:Router) { }

  userdata!:any;
  authenticated : boolean = false;

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
      
     
      //alert("Logged In as .. " + String(this.userdata.username) )
      Emitters.authEmitter.emit(true);
    },
    err => {
      //alert("not Logged In")
      Emitters.authEmitter.emit(false);
    }
  );
  }
  swapValue(){
    if(this.show==0)
    {
      this.show=1;
    }
    else
    {
      this.show=0;
    }
  }

  getPreviousBids()
  {

    
    var reqData = {
      username : this.userdata.username
    }
    this.userService.getPreviousBids(reqData).subscribe(res=>{
      this.recentBids = res;
      console.log(this.recentBids);
      if(this.click)
    {
      this.click=false;
    }
    else
    {
      this.click = true;
    }
    })
  }

  editProfile()
  {
    this.router.navigate(['../editProfile']);
  }
  showProduct(productId:String)
  {
    this.router.navigate(['product', productId]);
  }


}

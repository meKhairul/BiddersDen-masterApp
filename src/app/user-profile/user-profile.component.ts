import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user = new User();
  totalSells !: any;
  totalBuys !: any;
  totalMoneySpent!:any;
  recentBids!:any;
  show :number = 0;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    
    this.user = this.userService.getUser();
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


}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin-userlist',
  templateUrl: './admin-userlist.component.html',
  styleUrls: ['./admin-userlist.component.css']
})
export class AdminUserlistComponent implements OnInit {

  users : User[] = []
  isModal : boolean =false;
  constructor(private userService:UserService , private router:Router) { }

  ngOnInit(): void {
    this.getAllusers();
    
  }
  getAllusers()
  {
    this.userService.getAllUsers().subscribe(data=>{
      this.users = data;
      console.log(this.users);
    });
  }
  addModal()
  {
    if(this.isModal)
    {
      this.isModal = false
    }
    else
    {
      this.isModal  = true;
    }
  }
  add()
  {
    this.router.navigate(['admin-adduser']);
  }
  ban()
  {
    this.router.navigate(['admin-banuser']);
  }
  
  

}

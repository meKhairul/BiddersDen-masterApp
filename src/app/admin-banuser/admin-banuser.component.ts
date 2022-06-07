import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin-banuser',
  templateUrl: './admin-banuser.component.html',
  styleUrls: ['./admin-banuser.component.css']
})
export class AdminBanuserComponent implements OnInit {

  userId!:any;

  constructor(private userService:UserService,private router:Router) { }

  ngOnInit(): void {
  }

  ban(userId:String)
  {
    this.router.navigate(['../admin-userlist']);
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  
  password :String = "";
  conf_password :String = "";
  constructor(private userService : UserService, private router : Router) { }
  ngOnInit(): void {

  }
  submit(){
    var user = this.userService.getUser();
    this.userService.changePassword(this.password, user.username).subscribe(data=>{
        console.log(data)
    });
    this.router.navigate(['']);
  }

}

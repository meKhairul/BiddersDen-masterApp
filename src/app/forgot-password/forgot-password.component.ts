import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  email :String = "";
  constructor(private userService: UserService, private router:Router) { }

  ngOnInit(): void {
  }
  submit(){
    this.userService.recover(this.email).subscribe(response=>{
    });
    
    this.router.navigate(['signinwithcode']);
  }
}

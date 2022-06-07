import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-sign-in-with-recovery-code',
  templateUrl: './sign-in-with-recovery-code.component.html',
  styleUrls: ['./sign-in-with-recovery-code.component.css']
})
export class SignInWithRecoveryCodeComponent implements OnInit {

  code :String = "";
  userdata!: any;
  constructor(private userService : UserService, private router : Router) { }

  ngOnInit(): void {

  }
  submit(){
    this.userService.logInWithRecoveryCode(this.code).subscribe(response=>{
      this.userdata = response;
      this.userService.setUser(this.userdata);
    });
    this.router.navigate(['change-password']);
  }

}

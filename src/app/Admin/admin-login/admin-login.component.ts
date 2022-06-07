import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  username!: any;
  password!:any;

  constructor(private userService:UserService,private router:Router) { }

  ngOnInit(): void {
  }
  login(){
    console.log("logging in")
    var data = {
      //name:this.name,
      //phone_number:this.phone_number,
      //email:this.email,
      //address:this.address,
      username:this.username,
      password:this.password
    }
    this.userService.login(data).subscribe(response=>{
      //alert(response.toString())
      this.router.navigate(['/admin-home'])
    });
  
  }

}

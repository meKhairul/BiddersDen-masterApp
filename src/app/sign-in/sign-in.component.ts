import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  //angForm:FormGroup
  constructor(private fb: FormBuilder, private userService: UserService, private route: Router) {
    /*this.angForm = this.fb.group({
      name:['', Validators.required],
      phone:['', Validators.required],
      email:['', Validators.required],
      address:['', Validators.required],
      username:['', Validators.required],
      password:['', Validators.required],
    })
    */
  }
  @Input() user:any
  name!: string;
  phone_number!:string;
  email!:string;
  address!:string;
  username!: string;
  password!:string;
 
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
      this.route.navigate(['/'])
    });
  
  }
}

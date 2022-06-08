import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  //angForm:FormGroup
  constructor(private fb: FormBuilder, private userService: UserService, private route: Router,private toastr:ToastrService) {
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

    if(this.username != null && this.password!=null)
    {
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
        this.toastr.success('Hi,username', 'Login Successfully');
        this.route.navigate(['/'])
      });
    }
    else
    {
      
        this.toastr.success('Hello world!', 'Toastr fun!');
      
      //alert("Username or Password can't be blank!");
    }

    
  
  }
  
  
 
  addUser(){
    console.log("adding User")
    var data = {
      name:this.name,
      phone_number:this.phone_number,
      email:this.email,
      address:this.address,
      username:this.username,
      password:this.password
    }
    this.userService.addUser(data).subscribe(response=>{
      alert(response)
      this.route.navigate(['signin'])
    });
  }
}

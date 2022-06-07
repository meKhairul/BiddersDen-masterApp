import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Emitters } from '../emiiters/Emitter';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  constructor(private userService:UserService,private router:Router) { 
    
  }




  authenticated : boolean = false;
  userdata!: any;

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
  updateProfile()
  {
    
    var res = {
      username: this.userdata.username,
      newName : this.userdata.name,
      newUsername : this.userdata.username,
      newPassword : this.userdata.password,
      newaddress : this.userdata.address,
      
      newPhoneNumber : this.userdata.phone_number,
      
    }
    this.userService.updateUser(res).subscribe(response=>{
      this.router.navigate(['../userprofile']);
    })
  }
  
}

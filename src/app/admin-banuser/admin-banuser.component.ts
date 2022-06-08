import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Emitters } from '../emiiters/Emitter';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin-banuser',
  templateUrl: './admin-banuser.component.html',
  styleUrls: ['./admin-banuser.component.css']
})
export class AdminBanuserComponent implements OnInit {

  userId!:any;
  userdata!:any;
  authenticated : boolean = false;
  constructor(private userService:UserService,private router:Router) { }

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
      
      if(this.userdata.username!='biddersden')
    {
      this.router.navigate(['']);
    }
      //alert("Logged In as .. " + String(this.userdata.username) )
      Emitters.authEmitter.emit(true);
    },
    err => {
      //alert("not Logged In")
      Emitters.authEmitter.emit(false);
    }
  );
  }

  ban(username:String)
  {
    var req = {
      username : username,
    }
    this.userService.banUser(req).subscribe(response=>{
      
    });
    this.router.navigate(['../admin-userlist']);
  }

}

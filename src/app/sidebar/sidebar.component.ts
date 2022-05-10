import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Emitters } from '../emiiters/Emitter';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private userService:UserService) { }
  authenticated = false;
  
  ngOnInit(): void {
    Emitters.authEmitter.subscribe(
      (auth: boolean) => {
        this.authenticated = auth;
      }
    );
  }

  logout(): void {
    this.userService.logout().subscribe(() => this.authenticated = false);
  }

}

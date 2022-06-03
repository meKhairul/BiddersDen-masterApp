import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Message } from '../message';
import { User } from '../user';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: Message[] = [];
  user  = new User()
  newMessageText = "";
  constructor(private userService: UserService,private router:Router) { }
  
  ngOnInit(): void {
    this.getMessages();
  }
  getMessages(){
    this.user = this.userService.getUser();
    var req  = {
        username : this.user.username,
    }
    this.userService.getMessages(req).subscribe(data=>{
      this.messages = data;
    });
  }
  sendMessage(){
    var messageWithHeader = {
      text : this.newMessageText,
      username : this.user.username, 
    }
    this.userService.sendMessage(messageWithHeader).subscribe(data=>{
    });
    var req  = {
      username : this.user.username
    }
    this.userService.getMessages(req).subscribe(data=>{
      this.messages = data;
    });
  }

}
function data(data: any, arg1: (any: any) => void) {
  throw new Error('Function not implemented.');
}


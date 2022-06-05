import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Message } from '../message';
import { User } from '../user';
import { Emitters } from '../emiiters/Emitter';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: Message[] = [];
  user = new User();
  newMessageText = "";
  newMessage : Message = new Message();
  nomessage:boolean = false;
  authenticated : boolean = false;
  clicked:boolean = false;
  constructor(private userService: UserService,private router:Router) { }
  
  ngOnInit(): void {
    this.getMessages();
    Emitters.authEmitter.subscribe(
      (auth: boolean) => {
        this.authenticated = auth; 
        this.user = this.userService.getUser();
      }

    );
  }
  getMessages(){
    
      var req  = {
        username : this.user.username,
    }
    this.userService.getMessages(req).subscribe(data=>{
      this.messages = data;
      if(this.messages.length==0)
      {
        this.nomessage=true;
      }
      console.log(this.messages);
    });
      //this.userService.setUser(this.user);
      
    
    
    
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
    this.newMessage.room = this.user.username;
    this.newMessage.sender = this.user.username;
    this.newMessage.text = this.newMessageText;
    
    this.newMessage.time = new Date();
    
    console.log(this.newMessage.time)
    this.messages.push(this.newMessage);
    this.userService.getMessages(req).subscribe(data=>{
      this.messages = data;
      if(this.router.url == "/chat"){
        
        console.log("we are here:" +this.router.url);
        let currentUrl = this.router.url;
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
      }
      else {this.router.navigate(['chat']);}
    });
  }

  showTime(message : Message)
  {
    if(this.clicked)
    {
      this.clicked = false;
    }
    else
    {
      this.clicked = true;
    }
    console.log(this.clicked);

  }

}
function data(data: any, arg1: (any: any) => void) {
  throw new Error('Function not implemented.');
}


import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Route, Router } from '@angular/router';
import { Message } from '../message';
import Pusher from 'pusher-js';
import {HttpClient} from "@angular/common/http";
import { Emitters } from '../emiiters/Emitter';
@Component({
  selector: 'app-admin-chat',
  templateUrl: './admin-chat.component.html',
  styleUrls: ['./admin-chat.component.css']
})
export class AdminChatComponent implements OnInit {

  unique_room : String[] = [];
  isUniqueRoom : boolean = false;
  allrooms : Message[] = [];
  userRoom : String = "";
  search !: String;
  //messages!: any[];
  user! : any;
  newMessageText = "";
  newMessage : Message = new Message();
  nomessage:boolean = false;
  authenticated : boolean = false;
  clicked:boolean = false;
  andu : String = ""
  API_URL = 'http://127.0.0.1:8000'
 // constructor(private userService: UserService,private router:Router, private http: HttpClient) { }
  
  /*ngOnInit(): void {
    this.authenticate();

    Pusher.logToConsole = true;

      const pusher = new Pusher('82886c57e5fbccc75a62', {
        cluster: 'mt1'
      });

      const channel = pusher.subscribe('chatApp');
      channel.bind('message', (data: any) => {
       this.messages.push(data);
      });
      console.log(this.messages)
    
  }
  */
  username = 'username';
  message = '';
  messages: Message[] = [];

  userdata!:any;
 

  constructor(private http: HttpClient, private userService : UserService,private router:Router) {
  }

  ngOnInit(): void {

    Emitters.authEmitter.subscribe(
      (auth: boolean) => {
        this.authenticated = auth; 
        this.userdata = this.userService.getUser();
      }

    );
    this.authenticate();
    
    
    this.userService.authenticate().subscribe(response => {
      this.user = response;
      this.pusher();
      this.getMessages();
     });
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

  pusher(){
    Pusher.logToConsole = true;

    const pusher = new Pusher('82886c57e5fbccc75a62', {
      cluster: 'mt1'
    });

    const channel = pusher.subscribe('chatApp');
    channel.bind('message', (data: any) => {
      if(data.room==this.userRoom) this.allrooms.push(data);
      //alert('An event was triggered with message: ' + data.message);
    });
  }

  parse()
  {
    for(let data of this.allrooms)
    {
      if(!this.unique_room.includes(data.room) && data.room != 'biddersden')
      {
        this.unique_room.push(data.room);
        
      }
    }
    console.log(this.unique_room);
  }

  submit(): void {
    //this.messages.push(this.message)
      console.log(this.userRoom)  
      this.http.post(this.API_URL + '/message/', {
      username: this.user.username,
      message: this.message, 
      room : this.userRoom
    }).subscribe(() => {
      this.message = '';
    });
  }
  
  /*submit(): void {
    this.http.post(this.API_URL + '/message/', {
      username: this.user.username,
      message: this.newMessageText,
      sender:this.user.username,
    }).subscribe(() => this.andu = '');
  }*/

  showChat(room:String)
  {
    this.userRoom = room;
    console.log(room);
  }

  /*authenticate(){
    this.userService.authenticate().subscribe(response => {
      this.user = response;
     });
  }
  */

  getMessages(){
    
      var req  = {
        username : this.user.username,
      }
      this.userService.getMessages(req).subscribe(data=>{
       
       this.allrooms = data;
      console.log(this.allrooms);
      this.parse();
    });
      //this.userService.setUser(this.user);
       
  }
  /*sendMessage(){
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
    //   if(this.router.url == "/chat"){
        
    //     console.log("we are here:" +this.router.url);
    //     let currentUrl = this.router.url;
    //     this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
    //     this.router.navigate([currentUrl]);
    // });
    //   }
    //   else {this.router.navigate(['chat']);}
    });
  }*/

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

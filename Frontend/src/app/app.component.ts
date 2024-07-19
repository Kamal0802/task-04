import { Component, OnInit } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Frontend';


  constructor(private chat:ChatService){}
  /*private socket: Socket;
  private readonly url = 'http://localhost:5000'; // Adjust to your Node.js server URL

  constructor() {
    this.socket = io(this.url, {
      transports: ['websocket', 'polling'],
      withCredentials: false, // Adjust if you need to send cookies or authentication tokens
    });
    
  } */

    ngOnInit(): void {
      

    }

    
}

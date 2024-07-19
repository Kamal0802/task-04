import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private socket: Socket;
  private readonly url = 'http://localhost:5000';

  constructor(private http: HttpClient) {
    this.socket = io(
      this.url,

      {
        transports: ['websocket', 'polling'],
        withCredentials: false,
        query: {
					userId: localStorage.getItem("Token"),
				},
      }
    );
  }

  sendMessage(data: any) {
    return this.http.post("http://localhost:5000/chat/send",data)
    
  }

   
  listenMessges(){
   return this.socket
  }

  getMessage(id: any): Observable<any> {
    return this.http.get('http://localhost:5000/chat/history/' + id);
  }
}

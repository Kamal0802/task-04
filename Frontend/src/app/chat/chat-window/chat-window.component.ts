import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css'],
})
export class ChatWindowComponent implements OnInit, AfterViewChecked {
  @ViewChild('main') private chatContainer!: ElementRef;
  currentUser!: any | undefined;
  textBox!: String;
  messages: any = [];
  id = '';
  userId: any;
  userName: any;
  constructor(
    private router: Router,
    private userServ: UserService,
    private chatServ: ChatService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('Token');
    this.userName = localStorage.getItem('UserName');
    this.id = this.router.url.split('/')[3];

    this.chatServ.getMessage(this.id).subscribe((res: any[]) => {
      console.log(res);
      this.messages = res;
    });

    this.chatServ.listenMessges().on('sendMessage', (res) => {
      console.log(res);
      this.messages.push(res);
    });

    this.userServ.getUserById(this.id).subscribe((res) => {
      console.log(res);

      this.currentUser = res;
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  sendText() {
    let data = {
      receiver: this.id,
      content: this.textBox,
    };

    this.chatServ.sendMessage(data).subscribe((res) => {
      this.messages.push(res);
    });

    this.chatServ.sendMessage;
    this.textBox = '';
  }

  scrollToBottom() {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch(err) {
      console.error(err);
    }
  }
}

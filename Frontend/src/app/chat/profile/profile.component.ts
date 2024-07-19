import { Component, OnInit } from '@angular/core';
import { ChatWindowComponent } from '../chat-window/chat-window.component';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  id!: string;
  currentUser: any;

  constructor(
    private router: Router,
    private userServ: UserService,
   
  ) {}
  
  

  
  ngOnInit(): void {

    this.id= this.router.url.split('/')[3];
    console.log(this.id);
    this.userServ.getUserById(this.id).subscribe((res) => {
      console.log(res);

      this.currentUser = res;
      
    });
    
  }

}

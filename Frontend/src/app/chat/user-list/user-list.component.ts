import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(private userServ:UserService,private router:Router){

  }

  UserForSideBar:any

  ngOnInit(): void {
    this.userServ.userForSideBar().subscribe(res=>{
      this.UserForSideBar=res;
      console.log(this.UserForSideBar);
     
      
    })
  }



}

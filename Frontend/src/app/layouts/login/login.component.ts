import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private userServ: UserService,private router:Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required]],
    });
  }

  login() {
    console.log(this.loginForm.value);
    this.userServ.loginUser(this.loginForm.value).subscribe((res) => {
      localStorage.setItem('Token', res.id);
      localStorage.setItem('UserId', res.token);
      console.log(localStorage.getItem("Token"));
      
      
      localStorage.setItem('UserName', res.userName);
      this.loginForm.reset();
      this.router.navigateByUrl("/dashboard")
    });
  }
}

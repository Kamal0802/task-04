import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(private fb: FormBuilder, private userServ: UserService,private router:Router) {}

  signupForm!: FormGroup;

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      bio: ['', [Validators.required]],
    });
  }

  signup() {
    console.log(this.signupForm.value);
    this.userServ.registerUser(this.signupForm.value).subscribe((res) => {
      localStorage.setItem('Token', res.id);
      localStorage.setItem('UserId', res.token);
      this.signupForm.reset()
      this.router.navigateByUrl("/dashboard")

    });

    
  }
}

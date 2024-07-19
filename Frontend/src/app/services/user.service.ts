import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 

  constructor(private http: HttpClient) {}

  registerUser(userData: any): Observable<any> {
    return this.http.post("http://localhost:5000/user/register", userData);
  }

  loginUser(userData:any): Observable<any> {
    return this.http.post("http://localhost:5000/user/login", userData);
  }

  userForSideBar(){
    return this.http.get("http://localhost:5000/user");
  }

  getUserById(id:any){
    return this.http.get("http://localhost:5000/user/"+id)
  }
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './layouts/home/home.component';
import { LoginComponent } from './layouts/login/login.component';
import { SignupComponent } from './layouts/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthorizationInterceptor } from './services/authorization.interceptor';
import { ChatModule } from './chat/chat.module';
import { Socket } from 'socket.io-client';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    

    
  ],
  imports: [
    BrowserModule,
    ChatModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    

  ],
  providers: [
    UserService,
    {
    provide:HTTP_INTERCEPTORS,
    useClass:AuthorizationInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

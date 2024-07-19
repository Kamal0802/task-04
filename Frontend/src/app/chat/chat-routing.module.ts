import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmptyComponent } from './empty/empty.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [

  {path:"dashboard",component:DashboardComponent,children: [
    { path: '', component: EmptyComponent },
    { path: 'profile/:id', component: ProfileComponent },
    { path: 'chat-window/:id', component: ChatWindowComponent },

    
  ]},
  
  
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }

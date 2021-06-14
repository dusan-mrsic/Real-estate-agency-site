import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AgentComponent } from './agent/agent.component';
import { GuestComponent } from './guest/guest.component';
import { RegisteredUserComponent } from './registered-user/registered-user.component';
import { WelcomeScreenComponent } from './welcome-screen/welcome-screen/welcome-screen.component';

const routes: Routes = [
  {path: '', component: WelcomeScreenComponent},
  {path: 'guest', component: GuestComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'user', component: RegisteredUserComponent},
  {path: 'agent', component: AgentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

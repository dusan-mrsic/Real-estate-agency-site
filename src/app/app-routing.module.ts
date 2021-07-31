import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AgentComponent } from './agent/agent.component';
import { GuestComponent } from './guest/guest.component';
import { RegisteredUserComponent } from './registered-user/registered-user.component';
import { AuthGuard } from './welcome-screen/welcome-screen/auth.guard';
import { WelcomeScreenComponent } from './welcome-screen/welcome-screen/welcome-screen.component';

const routes: Routes = [
  {path: '', component: WelcomeScreenComponent},
  {path: 'guest', component: GuestComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
  {path: 'user', component: RegisteredUserComponent,canActivate: [AuthGuard]},
  {path: 'agent', component: AgentComponent,canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestComponent } from './guest/guest.component';
import { WelcomeScreenComponent } from './welcome-screen/welcome-screen/welcome-screen.component';

const routes: Routes = [
  {path: '', component: WelcomeScreenComponent},
  {path: 'guest', component: GuestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

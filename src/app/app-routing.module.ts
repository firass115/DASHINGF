import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuestLayoutComponent } from './layout/guest/guest-layout/guest-layout.component';
import { AuthorisedLayoutComponent } from './layout/authorised/authorised-layout/authorised-layout.component';
import { RegistrationComponent } from './account/pages/registration/registration.component';
import { LoginComponent } from './account/pages/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { ForbiddenComponent } from './forbidden/forbidden.component';

const routes: Routes = [
  {
    path: '',
    component: AuthorisedLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'forbidden', component: ForbiddenComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

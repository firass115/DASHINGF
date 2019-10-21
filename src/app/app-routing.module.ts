import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuestLayoutComponent } from './layout/guest/guest-layout/guest-layout.component';
import { AuthorisedLayoutComponent } from './layout/authorised/authorised-layout/authorised-layout.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { DetailProfileComponent } from './pages/profile/detail-profile/detail-profile.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';

const routes: Routes = [
  { path: '', redirectTo: '/user/login', pathMatch: 'full' },
  {
    path: 'user',
    component: GuestLayoutComponent,
    children: [
      { path: 'registration', component: RegistrationComponent },
      { path: 'login', component: LoginComponent }
    ]
  },
  {
    path: '',
    component: AuthorisedLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
      {
        path: 'profile/detail',
        component: DetailProfileComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'usermanagement',
        component: UserManagementComponent,
        canActivate: [AuthGuard],
        data: { permittedRoles: ['Admin'] }
      },
      { path: 'forbidden', component: ForbiddenComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

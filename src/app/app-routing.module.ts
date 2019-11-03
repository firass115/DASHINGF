import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuestLayoutComponent } from './layout/guest/guest-layout/guest-layout.component';
import { AuthorisedLayoutComponent } from './layout/authorised/authorised-layout/authorised-layout.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { UserInfoComponent } from './pages/controls/user-info/user-info.component';
import { UsersManagementComponent } from './pages/controls/users-management/users-management.component';

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
      { path: 'forbidden', component: ForbiddenComponent },
      {
        path: 'settings',
        component: SettingsComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: 'profile',
            component: UserInfoComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'users',
            component: UsersManagementComponent,
            canActivate: [AuthGuard],
            data: { permittedRoles: ['Admin'] }
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { RolesManagementComponent } from './pages/roles-management/roles-management.component';
import { RoleEditorComponent } from './pages/role-editor/role-editor.component';
import { SettingsComponent } from './settings.component';
import { UserInfoComponent } from './pages/user-info/user-info.component';
import { UsersManagementComponent } from './pages/users-management/users-management.component';
import { AuthorisedLayoutComponent } from '../layout/authorised/authorised-layout/authorised-layout.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AuthorisedLayoutComponent,
    children: [
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
          },
          {
            path: 'roles',
            component: RolesManagementComponent,
            canActivate: [AuthGuard],
            data: { permittedRoles: ['Admin'] }
          },
          {
            path: 'editRole/:id',
            component: RoleEditorComponent,
            canActivate: [AuthGuard],
            data: { permittedRoles: ['Admin'] }
          },
          {
            path: 'editRole',
            component: RoleEditorComponent,
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
export class SettingsRoutingModule {}

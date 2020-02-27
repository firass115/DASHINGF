import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SettingsRoutingModule } from './settings-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';

import { RolesManagementComponent } from './pages/roles-management/roles-management.component';
import { RoleEditorComponent } from './pages/role-editor/role-editor.component';
import { SettingsComponent } from './settings.component';
import { UserInfoComponent } from './pages/user-info/user-info.component';
import { UsersManagementComponent } from './pages/users-management/users-management.component';
import { BootstrapSelectModule } from '../shared/modules/bootstrap-select/bootstrap-select.module';

@NgModule({
  declarations: [
    SettingsComponent,
    UserInfoComponent,
    UsersManagementComponent,
    RolesManagementComponent,
    RoleEditorComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    BootstrapSelectModule
  ]
})
export class SettingsModule {}
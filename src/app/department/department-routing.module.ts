import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepartmentManagementComponent } from './department-management/department-management.component';
import { AuthorisedLayoutComponent } from '../layout/authorised/authorised-layout/authorised-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AuthorisedLayoutComponent,
    children: [{ path: 'department', component: DepartmentManagementComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentRoutingModule {}

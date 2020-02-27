import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorisedLayoutComponent } from '../layout/authorised/authorised-layout/authorised-layout.component';
import { EmployeeManagementComponent } from './employee-management/employee-management.component';

const routes: Routes = [
  {
    path: '',
    component: AuthorisedLayoutComponent,
    children: [{ path: 'employees', component: EmployeeManagementComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule {}

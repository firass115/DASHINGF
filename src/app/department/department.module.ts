import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DepartmentRoutingModule } from './department-routing.module';
import { DepartmentManagementComponent } from './department-management/department-management.component';

@NgModule({
  declarations: [DepartmentManagementComponent],
  imports: [
    CommonModule,
    DepartmentRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class DepartmentModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeEditorComponent } from './employee-editor/employee-editor.component';
import { EmployeeManagementComponent } from './employee-management/employee-management.component';
import { BootstrapSelectModule } from '../shared/modules/bootstrap-select/bootstrap-select.module';

@NgModule({
  declarations: [EmployeeEditorComponent, EmployeeManagementComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EmployeeRoutingModule,
    BootstrapSelectModule
  ]
})
export class EmployeeModule {}

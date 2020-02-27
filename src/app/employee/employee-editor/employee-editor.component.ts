import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { Department } from 'src/app/models/department.model';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'employee-editor',
  templateUrl: './employee-editor.component.html',
  styleUrls: ['./employee-editor.component.css']
})
export class EmployeeEditorComponent implements OnInit {
  @Input() curEmployee: Employee;
  @Input() AllDepartments: Department[];
  @ViewChild('f', { static: false })
  public form;

  public employee: Employee;
  public employeeEdit: Employee;
  public isEditMode = false;
  public isSaving = false;
  public showValidationErrors = false;

  constructor(
    private service: EmployeeService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.employee = this.curEmployee;
    if (!this.employee.departmentId) {
      this.edit();
    }
  }

  edit() {
    this.isEditMode = true;
    this.showValidationErrors = true;
    this.employeeEdit = new Employee();
    Object.assign(this.employeeEdit, this.employee);
  }

  cancel() {
    this.showValidationErrors = false;
    this.isEditMode = false;
    this.form.resetForm();
  }

  save() {
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    if (this.employeeEdit.employeeId) {
      this.service.updateEmployee(this.employeeEdit).subscribe(
        res => {
          this.saveSuccessHelper();
        },
        error => this.saveFailedHelper(error)
      );
    } else {
      this.service.addEmployee(this.employeeEdit).subscribe(
        res => {
          this.saveSuccessHelper();
        },
        error => this.saveFailedHelper(error)
      );
    }
    this.isEditMode = false;
  }

  saveSuccessHelper() {
    this.showValidationErrors = false;
    this.isEditMode = false;
    this.employeeEdit.departmentName = this.AllDepartments.find(
      d => d.departmentId == +this.employeeEdit.departmentId
    ).name;
    Object.assign(this.employee, this.employeeEdit);
    this.employeeEdit = new Employee();
    this.form.resetForm();
    this.toastr.success('Employee is updated!', 'Save successful');
  }

  private saveFailedHelper(error: HttpErrorResponse) {
    this.showErrorAlert(
      'Save Error',
      error.error ? error.error : error.message
    );
  }

  showErrorAlert(caption: string, message: string) {
    this.toastr.error(message, caption);
  }
}

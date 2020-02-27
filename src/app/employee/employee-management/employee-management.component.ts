import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { Employee } from 'src/app/models/employee.model';
import { Department } from 'src/app/models/department.model';
import { EmployeeEditorComponent } from '../employee-editor/employee-editor.component';

@Component({
  selector: 'app-employee-management',
  templateUrl: './employee-management.component.html',
  styleUrls: ['./employee-management.component.css']
})
export class EmployeeManagementComponent implements OnInit {
  Employees: Employee[];
  AllDepartments: Department[];

  constructor(private service: EmployeeService) {}

  ngOnInit() {
    this.service.getEmployeesAndDepartments().subscribe((res: any) => {
      this.Employees = res[0];
      this.AllDepartments = res[1];
    });
  }

  addEmployee() {
    this.Employees.push(new Employee());
  }
}

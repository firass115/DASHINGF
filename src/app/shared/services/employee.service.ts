import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Employee } from 'src/app/models/employee.model';
import { forkJoin } from 'rxjs';
import { Department } from 'src/app/models/department.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  readonly BaseURI = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getEmployeesAndDepartments() {
    return forkJoin(
      this.http.get<Employee[]>(this.BaseURI + '/Employee'),
      this.http.get<Department[]>(this.BaseURI + '/Department')
    );
  }

  updateEmployee(employee: Employee) {
    const body = {
      FirstName: employee.firstName,
      LastName: employee.lastName,
      DepartmentName: employee.departmentName
    };
    const URI = this.BaseURI + '/Employee/' + employee.employeeId;

    return this.http.put(URI, body);
  }

  addEmployee(employee: Employee) {
    const body = {
      FirstName: employee.firstName,
      LastName: employee.lastName,
      DepartmentId: employee.departmentId
    };
    const URI = this.BaseURI + '/Employee/';

    return this.http.post(URI, body);
  }
}

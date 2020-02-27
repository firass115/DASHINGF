import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Department } from 'src/app/models/department.model';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  readonly BaseURI = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getDepartments() {
    return this.http.get<Department[]>(this.BaseURI + '/Department');
  }

  postDepartment(formData) {
    return this.http.post(this.BaseURI + '/Department', formData);
  }

  putDepartment(formData) {
    return this.http.put(
      this.BaseURI + '/Department/' + formData.departmentId,
      formData
    );
  }

  deleteDepartment(id) {
    return this.http.delete(this.BaseURI + '/Department/' + id);
  }
}

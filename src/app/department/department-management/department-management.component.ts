import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { Department } from 'src/app/models/department.model';
import { DepartmentService } from 'src/app/shared/services/department.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-department-management',
  templateUrl: './department-management.component.html',
  styleUrls: ['./department-management.component.css']
})
export class DepartmentManagementComponent implements OnInit {
  departmentForms: FormArray = this.fb.array([]);
  departmentList: Department[];
  constructor(
    private fb: FormBuilder,
    private service: DepartmentService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.service.getDepartments().subscribe(res => {
      if (res.length == 0) {
        this.addDepartmentForm();
      } else {
        res.forEach((department: Department) => {
          this.departmentForms.push(
            this.fb.group({
              departmentId: [department.departmentId],
              name: [department.name, Validators.required],
              description: [department.description]
            })
          );
        });
      }
    });
  }

  recordSubmit(fg: FormGroup) {
    if (fg.value.departmentId == 0) {
      this.service.postDepartment(fg.value).subscribe((res: any) => {
        fg.patchValue({ departmentId: res.departmentId });
        this.toastr.success('Department is created!', 'Save successful');
      });
    } else {
      this.service.putDepartment(fg.value).subscribe((res: any) => {
        this.toastr.success('Department is updated!', 'Save successful');
      });
    }
  }

  onDelete(departmentId, i) {
    if (departmentId == 0) {
      this.departmentForms.removeAt(i);
    } else if (confirm('Are you sure to delete this record ?')) {
      this.service.deleteDepartment(departmentId).subscribe(res => {
        this.departmentForms.removeAt(i);
        this.toastr.success('Department is deleted!', 'Delete successful');
      });
    }
  }

  addDepartmentForm() {
    this.departmentForms.push(
      this.fb.group({
        departmentId: [0],
        name: ['', Validators.required],
        description: ['']
      })
    );
  }
}

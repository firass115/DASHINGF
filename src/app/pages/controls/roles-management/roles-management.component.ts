import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/shared/services/account.service';
import { Role } from 'src/app/models/role.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'roles-management',
  templateUrl: './roles-management.component.html',
  styleUrls: ['./roles-management.component.scss']
})
export class RolesManagementComponent implements OnInit {
  roles: Role[] = [];

  constructor(
    private service: AccountService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.service
      .getRoles()
      .subscribe(
        (res: any) => (this.roles = res.roles),
        error =>
          this.toastr.error(
            'Unable to retrieve roles from the server',
            'Load roles failed'
          )
      );
  }

  editRole(row: Role) {
    this.router.navigate(['settings/editRole/' + row.id]);
  }

  deleteRole(row: Role) {
    if (confirm('Are you sure, you want to delete this role ?')) {
      this.service.deleteRole(row.id).subscribe(
        res => {
          this.toastr.success('Role is deleted!', 'Delete successful');
          this.loadData();
        },
        error =>
          this.toastr.error(
            error.error ? error.error : error.message,
            'Delete failed'
          )
      );
    }
  }

  newRole() {
    this.router.navigate(['settings/editRole/']);
  }
}

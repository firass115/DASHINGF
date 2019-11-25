import { Component, OnInit, ViewChild } from '@angular/core';
import { Role } from 'src/app/models/role.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'role-editor',
  templateUrl: './role-editor.component.html',
  styles: []
})
export class RoleEditorComponent implements OnInit {
  @ViewChild('f', { static: false })
  public form;
  role: Role;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: AccountService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    const key = 'id';
    const id = this.route.snapshot.params[key];
    if (id) {
      this.service.getRole(id).subscribe(role => (this.role = role));
    } else {
      this.role = new Role();
    }
  }

  cancel() {
    this.router.navigate(['settings/roles/']);
  }

  save() {
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    if (this.role.id) {
      this.service.updateRole(this.role, this.role.id).subscribe(
        res => {
          this.toastr.success(
            'The role ' + this.role.name + ' is updated!',
            'Save successful'
          );
          this.router.navigate(['settings/roles/']);
        },
        error =>
          this.toastr.error(
            error.error ? error.error : error.message,
            'Save Error'
          )
      );
    } else {
      this.service.createRole(this.role).subscribe(
        res => {
          this.toastr.success(
            'The role ' + this.role.name + ' is created!',
            'Save successful'
          );
          this.router.navigate(['settings/roles/']);
        },
        error =>
          this.toastr.error(
            error.error ? error.error : error.message,
            'Save failed'
          )
      );
    }
  }
}

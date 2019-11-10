import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core';
import { AccountService } from 'src/app/shared/services/account.service';
import { User } from 'src/app/models/user.model';
import { UserEdit } from 'src/app/models/user-edit.model';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { Role } from 'src/app/models/role.model';

@Component({
  selector: 'user-info',
  templateUrl: './user-info.component.html'
})
export class UserInfoComponent implements OnInit {
  @Input() curuser: User;
  @Input() isGeneralEditor: false;
  @Input() allRoles: Role[] = [];
  @Input() page: number;
  @Output() notify: EventEmitter<number> = new EventEmitter<number>();
  @ViewChild('f', { static: false })
  public form;

  public isEditMode = false;
  public user: User = new User();
  public userEdit: UserEdit;
  public isSaving = false;
  public isChangePassword = false;
  public showValidationErrors = false;

  constructor(private service: AccountService, private toastr: ToastrService) {}

  ngOnInit() {
    if (!this.isGeneralEditor) {
      this.service
        .getUser()
        .subscribe(
          user => (this.user = user),
          error =>
            this.toastr.error(
              'Unable to retrieve user data from the server',
              'Load failed'
            )
        );
    } else {
      this.user = this.curuser;
    }
  }

  edit() {
    this.userEdit = new UserEdit();
    this.isEditMode = true;
    this.showValidationErrors = true;
    this.isChangePassword = false;
    Object.assign(this.userEdit, this.user);
  }

  delete() {
    if (confirm('Are you sure you want to delete this user ?')) {
      this.service.deleteuser(this.user.id).subscribe(
        res => {
          this.toastr.success('User is deleted!', 'Delete successful');
          this.notify.emit(this.page);
        },
        error =>
          this.toastr.error(
            error.error ? error.error : error.message,
            'Delete failed'
          )
      );
    }
  }

  cancel() {
    this.userEdit = new UserEdit();
    this.showValidationErrors = false;
    this.isEditMode = false;
    this.isChangePassword = false;
    this.form.resetForm();
  }

  save() {
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    if (!this.isGeneralEditor) {
      this.service.updateUser(this.userEdit).subscribe(
        res => {
          this.saveSuccessHelper();
        },
        error => this.saveFailedHelper(error)
      );
    } else {
      this.service.updateUser(this.userEdit, this.userEdit.id).subscribe(
        res => {
          this.saveSuccessHelper();
        },
        error => this.saveFailedHelper(error)
      );
    }
    this.isSaving = false;
  }

  showErrorAlert(caption: string, message: string) {
    this.toastr.error(message, caption);
  }

  changePassword() {
    this.isChangePassword = true;
  }

  saveSuccessHelper() {
    this.isChangePassword = false;
    this.showValidationErrors = false;
    this.isEditMode = false;
    Object.assign(this.user, this.userEdit);
    this.userEdit = new UserEdit();
    this.form.resetForm();
    this.toastr.success('User is updated!', 'Save successful');
  }

  private saveFailedHelper(error: HttpErrorResponse) {
    this.showErrorAlert(
      'Save Error',
      error.error ? error.error : error.message
    );
  }
}

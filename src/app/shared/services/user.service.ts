import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user.model';
import { UserEdit } from 'src/app/models/user-edit.model';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private fb: FormBuilder, private http: HttpClient) {}
  readonly BaseURI = 'http://localhost:54365/api';

  formModel = this.fb.group({
    UserName: ['', Validators.required],
    Email: ['', Validators.email],
    FullName: [''],
    Passwords: this.fb.group(
      {
        Password: ['', [Validators.required, Validators.minLength(4)]],
        ConfirmPassword: ['', Validators.required]
      },
      { validator: this.comparePasswords }
    )
  });

  comparePasswords(fb: FormGroup) {
    const confirmPswrdCtrl = fb.get('ConfirmPassword');
    if (
      confirmPswrdCtrl.errors == null ||
      'passwordMismatch' in confirmPswrdCtrl.errors
    ) {
      if (fb.get('Password').value !== confirmPswrdCtrl.value) {
        confirmPswrdCtrl.setErrors({ passwordMismatch: true });
      } else {
        confirmPswrdCtrl.setErrors(null);
      }
    }
  }

  register() {
    const body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      FullName: this.formModel.value.FullName,
      Password: this.formModel.value.Passwords.Password
    };
    return this.http.post(this.BaseURI + '/Account/Register', body);
  }

  login(formData) {
    return this.http.post(this.BaseURI + '/Account/Login', formData);
  }

  getUser() {
    return this.http.get<User>(this.BaseURI + '/Account/users/me');
  }

  updateUser(user: UserEdit, userId?: string) {
    const body = {
      UserName: user.userName,
      Email: user.email,
      FullName: user.fullName,
      CurrentPassword: user.currentPassword,
      NewPassword: user.newPassword,
      Roles: user.roles
    };
    const URI = userId
      ? this.BaseURI + '/Account/users/' + userId
      : this.BaseURI + '/Account/users/me';
    return this.http.put(URI, body);
  }

  getUsersAndRoles(page?: number, pageSize?: number) {
    return forkJoin(
      this.http.get(
        this.BaseURI +
          '/Account/users/' +
          page.toString() +
          '/' +
          pageSize.toString()
      ),
      this.http.get(this.BaseURI + '/Account/roles/')
    );
  }

  deleteuser(userId: string) {
    return this.http.delete(this.BaseURI + '/Account/users/' + userId);
  }

  roleMatch(allowedRoles): boolean {
    let isMatch = false;
    const payLoad = JSON.parse(
      window.atob(localStorage.getItem('token').split('.')[1])
    );
    const userRole = payLoad.role.split(',');
    allowedRoles.forEach(element => {
      if (userRole.indexOf(element) > -1) {
        isMatch = true;
        return false;
      }
    });
    return isMatch;
  }
}

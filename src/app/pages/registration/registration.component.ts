import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/shared/services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styles: []
})
export class RegistrationComponent implements OnInit {
  constructor(public service: AccountService, private toastr: ToastrService) {}

  ngOnInit() {}

  onSubmit() {
    this.service.register().subscribe(
      res => {
        this.service.formModel.reset();
        this.toastr.success('New user created!', 'Registration successful');
      },
      err => {
        this.toastr.error(err.error, 'Registration failed');
      }
    );
  }
}

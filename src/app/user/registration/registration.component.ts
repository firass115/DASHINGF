import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styles: []
})
export class RegistrationComponent implements OnInit {

  constructor(public userservice:UserService,private toastr: ToastrService) { }

  ngOnInit() {
  }

  
  onSubmit()
  {
    this.userservice.register().subscribe(
      (res:any) =>{
        if(res.succeeded)
        {
           this.userservice.formModel.reset();
           this.toastr.success('New user created!', 'Registration successful');
        }
        else
        {
          res.errors.forEach(element => {
              switch(element.code)
              {
                case 'DuplicateUserName':
                    this.toastr.error('User name is already taken', 'Registration failed');
                  break;
                default:
                    this.toastr.error(element.description, 'Registration failed');
                  break;
              }
          });
        }
      },
      err =>{
        console.log(err)
      }
    );
  }
}

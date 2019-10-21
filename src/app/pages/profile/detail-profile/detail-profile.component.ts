import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-detail-profile',
  templateUrl: './detail-profile.component.html',
  styles: []
})
export class DetailProfileComponent implements OnInit {
  profileDetails;

  constructor(private router: Router, public userservice: UserService) {}

  ngOnInit() {
    this.userservice.getDetailProfile().subscribe(
      (res: any) => {
        this.profileDetails = res;
      },
      err => {
        console.log(err);
      }
    );
  }
}

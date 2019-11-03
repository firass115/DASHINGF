import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-authorised-layout',
  templateUrl: './authorised-layout.component.html',
  styleUrls: ['./authorised-Layout.Component.scss']
})
export class AuthorisedLayoutComponent implements OnInit {
  constructor(private router: Router, public service: UserService) {}

  tab = 'home';
  role: string;

  ngOnInit() {}

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

  onProfile() {
    this.router.navigate(['/profile/detail']);
  }

  onClick(tabselected) {
    this.tab = tabselected;
  }
}

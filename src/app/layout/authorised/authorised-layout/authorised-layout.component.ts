import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account.service';

@Component({
  selector: 'app-authorised-layout',
  templateUrl: './authorised-layout.component.html',
  styleUrls: ['/authorised-Layout.component.scss']
})
export class AuthorisedLayoutComponent implements OnInit {
  constructor(private router: Router, public service: AccountService) {}

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

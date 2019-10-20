import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authorised-layout',
  templateUrl: './authorised-layout.component.html',
  styles: []
})
export class AuthorisedLayoutComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }
}

import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/models/user.model';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Role } from 'src/app/models/role.model';

@Component({
  selector: 'users-management',
  templateUrl: './users-management.component.html',
  styles: []
})
export class UsersManagementComponent implements OnInit {
  users: User[];
  asyncUsers: Observable<User[]>;
  p = 1;
  total: number;
  pagesize = 3;
  allRoles: Observable<Role[]>;

  constructor(private service: UserService) {}

  ngOnInit() {
    this.getPage(1);
  }

  getPage(page: number) {
    this.asyncUsers = this.service.getUsersAndRoles(page, this.pagesize).pipe(
      tap((res: any) => {
        this.total = res[0].total;
        this.p = page;
        this.allRoles = res[1].roles;
      }),
      map((res: any) => res[0].items)
    );
  }

  handleNotify(eventData: number) {
    this.getPage(eventData);
  }
}

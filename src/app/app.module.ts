import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EqualValidator } from './shared/directives/equal-validator.directive';

import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AccountService } from './shared/services/account.service';
import { HomeComponent } from './home/home.component';
import { PageContentComponent } from './layout/page-content/page-content.component';
import { GuestLayoutComponent } from './layout/guest/guest-layout/guest-layout.component';
import { AuthorisedLayoutComponent } from './layout/authorised/authorised-layout/authorised-layout.component';
import { AuthInterceptor } from './shared/services/auth.interceptor';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { SettingsModule } from './settings/settings.module';
import { AccountModule } from './account/account.module';
import { DepartmentModule } from './department/department.module';
import { EmployeeModule } from './employee/employee.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageContentComponent,
    GuestLayoutComponent,
    AuthorisedLayoutComponent,
    ForbiddenComponent,
    EqualValidator
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({ progressBar: true }), // ToastrModule added
    FormsModule,
    SettingsModule,
    AccountModule,
    DepartmentModule,
    EmployeeModule
  ],
  providers: [
    AccountService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';

import { EqualValidator } from './shared/directives/equal-validator.directive';

import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { AccountService } from './shared/services/account.service';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { PageContentComponent } from './layout/page-content/page-content.component';
import { GuestLayoutComponent } from './layout/guest/guest-layout/guest-layout.component';
import { AuthorisedLayoutComponent } from './layout/authorised/authorised-layout/authorised-layout.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { UserInfoComponent } from './pages/controls/user-info/user-info.component';
import { UsersManagementComponent } from './pages/controls/users-management/users-management.component';
import { BootstrapSelectDirective } from './shared/directives/bootstrap-select.directive';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { RolesManagementComponent } from './pages/controls/roles-management/roles-management.component';
import { RoleEditorComponent } from './pages/controls/role-editor/role-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    PageContentComponent,
    GuestLayoutComponent,
    AuthorisedLayoutComponent,
    ForbiddenComponent,
    SettingsComponent,
    UserInfoComponent,
    EqualValidator,
    UsersManagementComponent,
    BootstrapSelectDirective,
    RolesManagementComponent,
    RoleEditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({ progressBar: true }), // ToastrModule added
    FormsModule,
    NgxPaginationModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger' // set defaults here
    })
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

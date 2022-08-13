import { AuthService } from '@abp/ng.core';
import { PageAlertService, ToasterService } from '@abp/ng.theme.shared';
import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  get hasLoggedIn(): boolean {
    return this.oAuthService.hasValidAccessToken();
  }

  constructor(
    private oAuthService: OAuthService,
    private authService: AuthService,
    private alertService: PageAlertService,
    private toaster: ToasterService,
  ) {}

  login() {
    this.authService.navigateToLogin();
  }

  showToast() {
    this.toaster.success('success toast', 'success toast');
  }

  showAlert(
    alertType:
      | 'primary'
      | 'secondary'
      | 'success'
      | 'danger'
      | 'warning'
      | 'info'
      | 'light'
      | 'dark',
  ) {
    this.alertService.show({
      type: alertType,
      message: alertType,
      title: alertType,
    });
  }
}

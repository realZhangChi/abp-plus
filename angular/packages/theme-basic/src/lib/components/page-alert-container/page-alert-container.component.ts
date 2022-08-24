import { Component, ViewEncapsulation } from '@angular/core';
import { PageAlert, PageAlertService } from '@abp-plus/ng.theme.shared';

@Component({
  selector: 'abp-page-alert-container',
  templateUrl: './page-alert-container.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class PageAlertContainerComponent {
  constructor(public service: PageAlertService) {}

  getNzAlertType(alert: PageAlert) {
    switch (alert.type) {
      case 'primary':
      case 'success':
        return 'success';
      case 'secondary':
      case 'info':
      case 'light':
      case 'dark':
        return 'info';
      case 'warning':
        return 'warning';
      case 'danger':
        return 'error';
      default:
        return 'info';
    }
  }
}

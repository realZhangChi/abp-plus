import { ApplicationInfo, EnvironmentService } from '@abp/ng.core';
import { Component } from '@angular/core';

@Component({
  selector: 'abp-logo',
  templateUrl: './logo.component.html',
  styleUrls:['./logo.component.scss']
})
export class LogoComponent {
  get appInfo(): ApplicationInfo {
    return this.environment.getEnvironment().application;
  }

  constructor(private environment: EnvironmentService) {}
}

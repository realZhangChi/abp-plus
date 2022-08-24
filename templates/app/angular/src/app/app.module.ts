import { AccountConfigModule } from '@abp-plus/ng.account/config';
import { CoreModule } from '@abp/ng.core';
import { registerLocale } from '@abp/ng.core/locale';
import { IdentityConfigModule } from '@abp-plus/ng.identity/config';
import { SettingManagementConfigModule } from '@abp-plus/ng.setting-management/config';
import { TenantManagementConfigModule } from '@abp-plus/ng.tenant-management/config';
import { ThemeBasicModule } from '@abp-plus/ng.theme.basic';
import { ThemeSharedModule } from '@abp-plus/ng.theme.shared';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APP_ROUTE_PROVIDER } from './route.provider';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule.forRoot({
      environment,
      registerLocaleFn: registerLocale(),
    }),
    ThemeSharedModule.forRoot(),
    AccountConfigModule.forRoot(),
    IdentityConfigModule.forRoot(),
    TenantManagementConfigModule.forRoot(),
    SettingManagementConfigModule.forRoot(),
    ThemeBasicModule.forRoot(),
  ],
  declarations: [AppComponent],
  providers: [APP_ROUTE_PROVIDER],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { PageModule } from '@abp-plus/ng.components/page';
import { CoreModule, LazyModuleFactory } from '@abp/ng.core';
import { PermissionManagementModule } from '@abp-plus/ng.permission-management';
import { ThemeSharedModule } from '@abp-plus/ng.theme.shared';
import { UiExtensionsModule } from '@abp-plus/ng.theme.shared/extensions';
import { ModuleWithProviders, NgModule, NgModuleFactory } from '@angular/core';
import { NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxValidateCoreModule } from '@ngx-validate/core';
import { RolesComponent } from './components/roles/roles.component';
import { UsersComponent } from './components/users/users.component';
import { IdentityExtensionsGuard } from './guards/extensions.guard';
import { IdentityRoutingModule } from './identity-routing.module';
import { IdentityConfigOptions } from './models/config-options';
import {
  IDENTITY_CREATE_FORM_PROP_CONTRIBUTORS,
  IDENTITY_EDIT_FORM_PROP_CONTRIBUTORS,
  IDENTITY_ENTITY_ACTION_CONTRIBUTORS,
  IDENTITY_ENTITY_PROP_CONTRIBUTORS,
  IDENTITY_TOOLBAR_ACTION_CONTRIBUTORS,
} from './tokens/extensions.token';
import { OrganizationUnitsComponent } from './components/organization-units/organization-units.component';
import { UnitMembersComponent } from './components/organization-units/members/unit-members.component';
import { UnitRolesComponent } from './components/organization-units/roles/unit-roles.component';

@NgModule({
  declarations: [RolesComponent, UsersComponent, OrganizationUnitsComponent, UnitMembersComponent, UnitRolesComponent],
  exports: [RolesComponent, UsersComponent, OrganizationUnitsComponent],
  imports: [
    CoreModule,
    IdentityRoutingModule,
    NgbNavModule,
    ThemeSharedModule,
    UiExtensionsModule,
    NgbDropdownModule,
    PermissionManagementModule,
    NgxValidateCoreModule,
    PageModule,
  ],
})
export class IdentityModule {
  static forChild(options: IdentityConfigOptions = {}): ModuleWithProviders<IdentityModule> {
    return {
      ngModule: IdentityModule,
      providers: [
        {
          provide: IDENTITY_ENTITY_ACTION_CONTRIBUTORS,
          useValue: options.entityActionContributors,
        },
        {
          provide: IDENTITY_TOOLBAR_ACTION_CONTRIBUTORS,
          useValue: options.toolbarActionContributors,
        },
        {
          provide: IDENTITY_ENTITY_PROP_CONTRIBUTORS,
          useValue: options.entityPropContributors,
        },
        {
          provide: IDENTITY_CREATE_FORM_PROP_CONTRIBUTORS,
          useValue: options.createFormPropContributors,
        },
        {
          provide: IDENTITY_EDIT_FORM_PROP_CONTRIBUTORS,
          useValue: options.editFormPropContributors,
        },
        IdentityExtensionsGuard,
      ],
    };
  }

  static forLazy(options: IdentityConfigOptions = {}): NgModuleFactory<IdentityModule> {
    return new LazyModuleFactory(IdentityModule.forChild(options));
  }
}

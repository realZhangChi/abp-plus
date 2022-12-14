import { TenantDto } from '@abp-plus/ng.tenant-management/proxy';
import { ToolbarAction } from '@abp-plus/ng.theme.shared/extensions';
import { TenantsComponent } from '../components/tenants/tenants.component';

export const DEFAULT_TENANTS_TOOLBAR_ACTIONS = ToolbarAction.createMany<TenantDto[]>([
  {
    text: 'AbpTenantManagement::ManageHostFeatures',
    action: data => {
      const component = data.getInjected(TenantsComponent);
      component.openFeaturesModal('');
    },
    permission: 'FeatureManagement.ManageHostFeatures',
    icon: 'setting',
  },
  {
    text: 'AbpTenantManagement::NewTenant',
    action: data => {
      const component = data.getInjected(TenantsComponent);
      component.addTenant();
    },
    permission: 'AbpTenantManagement.Tenants.Create',
    icon: 'plus',
    btnClass: 'primary'
  },
]);

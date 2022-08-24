import { TenantDto } from '@abp-plus/ng.tenant-management/proxy';
import { EntityProp, ePropType } from '@abp-plus/ng.theme.shared/extensions';

export const DEFAULT_TENANTS_ENTITY_PROPS = EntityProp.createMany<TenantDto>([
  {
    type: ePropType.String,
    name: 'name',
    displayName: 'AbpTenantManagement::TenantName',
    sortable: true,
  },
]);

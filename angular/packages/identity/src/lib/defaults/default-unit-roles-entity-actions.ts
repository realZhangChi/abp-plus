import { IdentityRoleDto } from '@abp-plus/ng.identity/proxy';
import { EntityAction } from '@abp-plus/ng.theme.shared/extensions';
import { UnitRolesComponent } from '../components/organization-units/roles/unit-roles.component';

export const DEFAULT_UNIT_ROLES_ENTITY_ACTIONS = EntityAction.createMany<IdentityRoleDto>([
  {
    text: 'AbpIdentity::Delete',
    action: data => {
      const component = data.getInjected(UnitRolesComponent);
      component.deleteRole(data.record);
    },
    permission: 'AbpIdentity.Roles.Delete',
    icon: 'delete',
  },
]);

import { IdentityRoleDto } from '@abp-plus/ng.identity/proxy';
import { ToolbarAction } from '@abp-plus/ng.theme.shared/extensions';
import { UnitRolesComponent } from '../components/organization-units/roles/unit-roles.component';

export const DEFAULT_UNIT_ROLES_TOOLBAR_ACTIONS = ToolbarAction.createMany<IdentityRoleDto[]>([
  {
    text: 'AbpIdentity::AddRole',
    action: data => {
      const component = data.getInjected(UnitRolesComponent);
      component.editRoles();
    },
    permission: 'AbpIdentity.Roles.Create',
    icon: 'plus',
    btnClass: 'primary',
  },
]);

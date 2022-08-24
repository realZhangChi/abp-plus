import { IdentityRoleDto } from '@abp-plus/ng.identity/proxy';
import { ToolbarAction } from '@abp-plus/ng.theme.shared/extensions';
import { RolesComponent } from '../components/roles/roles.component';

export const DEFAULT_ROLES_TOOLBAR_ACTIONS = ToolbarAction.createMany<IdentityRoleDto[]>([
  {
    text: 'AbpIdentity::NewRole',
    action: data => {
      const component = data.getInjected(RolesComponent);
      component.add();
    },
    permission: 'AbpIdentity.Roles.Create',
    icon: 'plus',
    btnClass: 'primary'
  },
]);

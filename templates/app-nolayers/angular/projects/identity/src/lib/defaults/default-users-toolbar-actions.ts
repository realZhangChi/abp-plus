import { IdentityUserDto } from '@abp-plus/ng.identity/proxy';
import { ToolbarAction } from '@abp-plus/ng.theme.shared/extensions';
import { UsersComponent } from '../components/users/users.component';

export const DEFAULT_USERS_TOOLBAR_ACTIONS = ToolbarAction.createMany<IdentityUserDto[]>([
  {
    text: 'AbpIdentity::NewUser',
    action: data => {
      const component = data.getInjected(UsersComponent);
      component.add();
    },
    permission: 'AbpIdentity.Users.Create',
    icon: 'plus',
    btnClass: 'primary'
  },
]);

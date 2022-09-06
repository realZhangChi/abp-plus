import { IdentityUserDto } from '@abp-plus/ng.identity/proxy';
import { ToolbarAction } from '@abp-plus/ng.theme.shared/extensions';
import { UnitMembersComponent } from '../components/organization-units/members/unit-members.component';

export const DEFAULT_UNIT_MEMEBERS_TOOLBAR_ACTIONS = ToolbarAction.createMany<IdentityUserDto[]>([
  {
    text: 'AbpIdentity::AddMember',
    action: data => {
      const component = data.getInjected(UnitMembersComponent);
      component.addMember();
    },
    permission: 'AbpIdentity.Roles.Create',
    icon: 'plus',
    btnClass: 'primary',
  },
]);

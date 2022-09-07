import { IdentityUserDto } from '@abp-plus/ng.identity/proxy';
import { EntityAction } from '@abp-plus/ng.theme.shared/extensions';
import { UnitMembersComponent } from '../components/organization-units/members/unit-members.component';

export const DEFAULT_UNIT_MEMEBERS_ENTITY_ACTIONS = EntityAction.createMany<IdentityUserDto>([
  {
    text: 'AbpIdentity::Delete',
    action: data => {
      const component = data.getInjected(UnitMembersComponent);
      component.deleteMember(data.record);
    },
    permission: 'AbpIdentity.OrganizationUnits.ManageUsers',
    icon: 'delete',
  },
]);

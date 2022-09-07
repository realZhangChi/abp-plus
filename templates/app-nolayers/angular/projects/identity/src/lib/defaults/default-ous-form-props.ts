import { OrganizationUnitDto } from '@abp-plus/ng.identity/proxy';
import { ePropType, FormProp } from '@abp-plus/ng.theme.shared/extensions';
import { Validators } from '@angular/forms';

export const DEFAULT_ORGANIZATION_UNITS_CREATE_FORM_PROPS = FormProp.createMany<OrganizationUnitDto>([
  {
    type: ePropType.String,
    name: 'displayName',
    displayName: 'AbpIdentity::DisplayName',
    id: 'ou-name',
    validators: () => [Validators.required],
  },
  {
    type: ePropType.Hidden,
    name: 'parentId',
  }
]);

export const DEFAULT_ORGANIZATION_UNITS_EDIT_FORM_PROPS = DEFAULT_ORGANIZATION_UNITS_CREATE_FORM_PROPS;

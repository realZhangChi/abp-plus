import type { ExtensibleEntityDto, ExtensibleObject, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface GetOrganizationUnitInput extends PagedAndSortedResultRequestDto {
  filter?: string;
}

export interface OrganizationUnitCreateDto extends OrganizationUnitCreateOrUpdateDtoBase {
  parentId?: string;
}

export interface OrganizationUnitCreateOrUpdateDtoBase extends ExtensibleObject {
  displayName: string;
}

export interface OrganizationUnitDto extends ExtensibleEntityDto<string> {
  parentId?: string;
  code?: string;
  displayName?: string;
  concurrencyStamp?: string;
}

export interface OrganizationUnitUpdateDto extends OrganizationUnitCreateOrUpdateDtoBase {
}

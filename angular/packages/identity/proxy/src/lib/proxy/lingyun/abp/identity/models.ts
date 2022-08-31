import type { EntityDto, ExtensibleAuditedEntityDto, ExtensibleEntityDto, ExtensibleObject, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { IdentityClaimValueType } from '../../../identity/identity-claim-value-type.enum';

export interface IdentityClaimDto extends EntityDto<string> {
  claimType?: string;
  claimValue?: string;
}

export interface IdentityClaimTypeCreateDto extends IdentityClaimTypeCreateOrUpdateBaseDto {
  name: string;
  isStatic: boolean;
  valueType: IdentityClaimValueType;
}

export interface IdentityClaimTypeCreateOrUpdateBaseDto extends ExtensibleObject {
  required: boolean;
  regex?: string;
  regexDescription?: string;
  description?: string;
}

export interface IdentityClaimTypeDto extends ExtensibleEntityDto<string> {
  name?: string;
  required: boolean;
  isStatic: boolean;
  regex?: string;
  regexDescription?: string;
  description?: string;
  valueType: IdentityClaimValueType;
}

export interface IdentityClaimTypeGetByPagedDto extends PagedAndSortedResultRequestDto {
  filter?: string;
}

export interface IdentityClaimTypeUpdateDto extends IdentityClaimTypeCreateOrUpdateBaseDto {
}

export interface IdentityRoleAddOrRemoveOrganizationUnitDto {
  organizationUnitIds: string[];
}

export interface IdentityRoleClaimCreateDto {
  claimType: string;
  claimValue: string;
}

export interface IdentityRoleClaimDeleteDto extends IdentityRoleClaimCreateDto {
}

export interface IdentityRoleClaimUpdateDto extends IdentityRoleClaimCreateDto {
  newClaimValue: string;
}

export interface IdentityUserClaimCreateDto extends IdentityUserClaimCreateOrUpdateDto {
}

export interface IdentityUserClaimCreateOrUpdateDto {
  claimType: string;
  claimValue?: string;
}

export interface IdentityUserClaimDeleteDto extends IdentityUserClaimCreateDto {
}

export interface IdentityUserClaimUpdateDto extends IdentityUserClaimCreateOrUpdateDto {
  newClaimValue?: string;
}

export interface IdentityUserOrganizationUnitUpdateDto {
  organizationUnitIds: string[];
}

export interface IdentityUserSetPasswordInput {
  password: string;
}

export interface OrganizationUnitAddRoleDto {
  roleIds: string[];
}

export interface OrganizationUnitAddUserDto {
  userIds: string[];
}

export interface OrganizationUnitCreateDto extends ExtensibleObject {
  displayName: string;
  parentId?: string;
}

export interface OrganizationUnitDto extends ExtensibleAuditedEntityDto<string> {
  parentId?: string;
  code?: string;
  displayName?: string;
}

export interface OrganizationUnitGetByPagedDto extends PagedAndSortedResultRequestDto {
  filter?: string;
}

export interface OrganizationUnitGetChildrenDto {
  id: string;
  recursive: boolean;
}

export interface OrganizationUnitGetUnaddedRoleByPagedDto extends PagedAndSortedResultRequestDto {
  filter?: string;
}

export interface OrganizationUnitGetUnaddedUserByPagedDto extends PagedAndSortedResultRequestDto {
  filter?: string;
}

export interface OrganizationUnitMoveDto {
  parentId?: string;
}

export interface OrganizationUnitUpdateDto extends ExtensibleObject {
  displayName?: string;
}

export interface TwoFactorEnabledDto {
  enabled: boolean;
}

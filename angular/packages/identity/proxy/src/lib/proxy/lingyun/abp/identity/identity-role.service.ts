import type { IdentityClaimDto, IdentityRoleAddOrRemoveOrganizationUnitDto, IdentityRoleClaimCreateDto, IdentityRoleClaimDeleteDto, IdentityRoleClaimUpdateDto, OrganizationUnitDto } from './models';
import { RestService } from '@abp/ng.core';
import type { ListResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IdentityRoleService {
  apiName = 'AbpIdentity';
  

  addClaim = (id: string, input: IdentityRoleClaimCreateDto) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: `/api/identity/roles/${id}/claims`,
      body: input,
    },
    { apiName: this.apiName });
  

  deleteClaim = (id: string, input: IdentityRoleClaimDeleteDto) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/identity/roles/${id}/claims`,
      params: { claimType: input.claimType, claimValue: input.claimValue },
    },
    { apiName: this.apiName });
  

  getClaims = (id: string) =>
    this.restService.request<any, ListResultDto<IdentityClaimDto>>({
      method: 'GET',
      url: `/api/identity/roles/${id}/claims`,
    },
    { apiName: this.apiName });
  

  getOrganizationUnits = (id: string) =>
    this.restService.request<any, ListResultDto<OrganizationUnitDto>>({
      method: 'GET',
      url: `/api/identity/roles/${id}/organization-units`,
    },
    { apiName: this.apiName });
  

  removeOrganizationUnits = (id: string, ouId: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/identity/roles/${id}/organization-units/${ouId}`,
    },
    { apiName: this.apiName });
  

  setOrganizationUnits = (id: string, input: IdentityRoleAddOrRemoveOrganizationUnitDto) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/identity/roles/${id}/organization-units`,
      body: input,
    },
    { apiName: this.apiName });
  

  updateClaim = (id: string, input: IdentityRoleClaimUpdateDto) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/identity/roles/${id}/claims`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}

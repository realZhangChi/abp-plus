import type { IdentityClaimDto, IdentityUserClaimCreateDto, IdentityUserClaimDeleteDto, IdentityUserClaimUpdateDto, IdentityUserOrganizationUnitUpdateDto, IdentityUserSetPasswordInput, OrganizationUnitDto, TwoFactorEnabledDto } from './models';
import { RestService } from '@abp/ng.core';
import type { ListResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IdentityUserService {
  apiName = 'AbpIdentity';
  

  addClaim = (id: string, input: IdentityUserClaimCreateDto) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: `/api/identity/users/${id}/claims`,
      body: input,
    },
    { apiName: this.apiName });
  

  changePassword = (id: string, input: IdentityUserSetPasswordInput) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: '/api/identity/users/change-password',
      params: { id },
      body: input,
    },
    { apiName: this.apiName });
  

  changeTwoFactorEnabled = (id: string, input: TwoFactorEnabledDto) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: '/api/identity/users/change-two-factor',
      params: { id },
      body: input,
    },
    { apiName: this.apiName });
  

  deleteClaim = (id: string, input: IdentityUserClaimDeleteDto) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/identity/users/${id}/claims`,
      params: { claimType: input.claimType, claimValue: input.claimValue },
    },
    { apiName: this.apiName });
  

  getClaims = (id: string) =>
    this.restService.request<any, ListResultDto<IdentityClaimDto>>({
      method: 'GET',
      url: `/api/identity/users/${id}/claims`,
    },
    { apiName: this.apiName });
  

  getOrganizationUnits = (id: string) =>
    this.restService.request<any, ListResultDto<OrganizationUnitDto>>({
      method: 'GET',
      url: `/api/identity/users/${id}/organization-units`,
    },
    { apiName: this.apiName });
  

  lock = (id: string, seconds: number) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/identity/users/${id}/lock/${seconds}`,
    },
    { apiName: this.apiName });
  

  removeOrganizationUnits = (id: string, ouId: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/identity/users/${id}/organization-units/${ouId}`,
    },
    { apiName: this.apiName });
  

  setOrganizationUnits = (id: string, input: IdentityUserOrganizationUnitUpdateDto) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/identity/users/${id}/organization-units`,
      body: input,
    },
    { apiName: this.apiName });
  

  unLock = (id: string) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/identity/users/${id}/unlock`,
    },
    { apiName: this.apiName });
  

  updateClaim = (id: string, input: IdentityUserClaimUpdateDto) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/identity/users/${id}/claims`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}

import type { OrganizationUnitAddRoleDto, OrganizationUnitAddUserDto, OrganizationUnitCreateDto, OrganizationUnitDto, OrganizationUnitGetByPagedDto, OrganizationUnitGetChildrenDto, OrganizationUnitGetUnaddedRoleByPagedDto, OrganizationUnitGetUnaddedUserByPagedDto, OrganizationUnitMoveDto, OrganizationUnitUpdateDto } from './models';
import { RestService } from '@abp/ng.core';
import type { ListResultDto, PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { GetIdentityUsersInput, IdentityRoleDto, IdentityUserDto } from '../../../identity/models';

@Injectable({
  providedIn: 'root',
})
export class OrganizationUnitService {
  apiName = 'AbpIdentity';
  

  addRoles = (id: string, input: OrganizationUnitAddRoleDto) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: `/api/identity/organization-units/${id}/roles`,
      body: input,
    },
    { apiName: this.apiName });
  

  addUsers = (id: string, input: OrganizationUnitAddUserDto) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: `/api/identity/organization-units/${id}/users`,
      body: input,
    },
    { apiName: this.apiName });
  

  create = (input: OrganizationUnitCreateDto) =>
    this.restService.request<any, OrganizationUnitDto>({
      method: 'POST',
      url: '/api/identity/organization-units',
      body: input,
    },
    { apiName: this.apiName });
  

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/identity/organization-units/${id}`,
    },
    { apiName: this.apiName });
  

  findChildren = (input: OrganizationUnitGetChildrenDto) =>
    this.restService.request<any, ListResultDto<OrganizationUnitDto>>({
      method: 'GET',
      url: '/api/identity/organization-units/find-children',
      params: { id: input.id, recursive: input.recursive },
    },
    { apiName: this.apiName });
  

  get = (id: string) =>
    this.restService.request<any, OrganizationUnitDto>({
      method: 'GET',
      url: `/api/identity/organization-units/${id}`,
    },
    { apiName: this.apiName });
  

  getAllList = () =>
    this.restService.request<any, ListResultDto<OrganizationUnitDto>>({
      method: 'GET',
      url: '/api/identity/organization-units/all',
    },
    { apiName: this.apiName });
  

  getLastChildOrNull = (parentId: string) =>
    this.restService.request<any, OrganizationUnitDto>({
      method: 'GET',
      url: '/api/identity/organization-units/last-children',
      params: { parentId },
    },
    { apiName: this.apiName });
  

  getList = (input: OrganizationUnitGetByPagedDto) =>
    this.restService.request<any, PagedResultDto<OrganizationUnitDto>>({
      method: 'GET',
      url: '/api/identity/organization-units',
      params: { filter: input.filter, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });
  

  getRoleNames = (id: string) =>
    this.restService.request<any, ListResultDto<string>>({
      method: 'GET',
      url: `/api/identity/organization-units/${id}/role-names`,
    },
    { apiName: this.apiName });
  

  getRoles = (id: string, input: PagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<IdentityRoleDto>>({
      method: 'GET',
      url: `/api/identity/organization-units/${id}/roles`,
      params: { skipCount: input.skipCount, maxResultCount: input.maxResultCount, sorting: input.sorting },
    },
    { apiName: this.apiName });
  

  getRoot = () =>
    this.restService.request<any, ListResultDto<OrganizationUnitDto>>({
      method: 'GET',
      url: '/api/identity/organization-units/root-node',
    },
    { apiName: this.apiName });
  

  getUnaddedRoles = (id: string, input: OrganizationUnitGetUnaddedRoleByPagedDto) =>
    this.restService.request<any, PagedResultDto<IdentityRoleDto>>({
      method: 'GET',
      url: `/api/identity/organization-units/${id}/unadded-roles`,
      params: { filter: input.filter, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });
  

  getUnaddedUsers = (id: string, input: OrganizationUnitGetUnaddedUserByPagedDto) =>
    this.restService.request<any, PagedResultDto<IdentityUserDto>>({
      method: 'GET',
      url: `/api/identity/organization-units/${id}/unadded-users`,
      params: { filter: input.filter, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });
  

  getUsers = (id: string, input: GetIdentityUsersInput) =>
    this.restService.request<any, PagedResultDto<IdentityUserDto>>({
      method: 'GET',
      url: `/api/identity/organization-units/${id}/users`,
      params: { filter: input.filter, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });
  

  move = (id: string, input: OrganizationUnitMoveDto) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/identity/organization-units/${id}/move`,
      body: input,
    },
    { apiName: this.apiName });
  

  update = (id: string, input: OrganizationUnitUpdateDto) =>
    this.restService.request<any, OrganizationUnitDto>({
      method: 'PUT',
      url: `/api/identity/organization-units/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}

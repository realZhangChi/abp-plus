import type { GetOrganizationUnitInput, OrganizationUnitCreateDto, OrganizationUnitDto, OrganizationUnitMoveDto, OrganizationUnitUpdateDto } from './models';
import { RestService } from '@abp/ng.core';
import type { ListResultDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrganizationUnitService {
  apiName = 'AbpIdentity';
  

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
  

  getList = (input: GetOrganizationUnitInput) =>
    this.restService.request<any, PagedResultDto<OrganizationUnitDto>>({
      method: 'GET',
      url: '/api/identity/organization-units',
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

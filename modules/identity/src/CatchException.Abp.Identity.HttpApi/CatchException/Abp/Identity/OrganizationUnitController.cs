﻿using System;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;

using Volo.Abp;
using Volo.Abp.Application.Dtos;
using Volo.Abp.AspNetCore.Mvc;
using Volo.Abp.Identity;

namespace CatchException.Abp.Identity;

[RemoteService(Name = IdentityRemoteServiceConsts.RemoteServiceName)]
[Area(IdentityRemoteServiceConsts.ModuleName)]
[ControllerName("OrganizationUnit")]
[Route("api/identity/organization-units")]
public class OrganizationUnitController : AbpControllerBase, IOrganizationUnitAppService
{
    protected IOrganizationUnitAppService OrganizationUnitAppService =>
        LazyServiceProvider.LazyGetRequiredService<IOrganizationUnitAppService>();

    [HttpGet]
    [Route("{id}")]
    public Task<OrganizationUnitDto> GetAsync(Guid id)
    {
        return OrganizationUnitAppService.GetAsync(id);
    }

    [HttpGet]
    public Task<PagedResultDto<OrganizationUnitDto>> GetListAsync(GetOrganizationUnitInput input)
    {
        return OrganizationUnitAppService.GetListAsync(input);
    }

    [HttpPost]
    public Task<OrganizationUnitDto> CreateAsync(OrganizationUnitCreateDto input)
    {
        return OrganizationUnitAppService.CreateAsync(input);
    }

    [HttpPut]
    [Route("{id}")]
    public Task<OrganizationUnitDto> UpdateAsync(Guid id, OrganizationUnitUpdateDto input)
    {
        return OrganizationUnitAppService.UpdateAsync(id, input);
    }

    [HttpDelete]
    [Route("{id}")]
    public Task DeleteAsync(Guid id)
    {
        return OrganizationUnitAppService.DeleteAsync(id);
    }

    [HttpGet]
    [Route("all")]
    public Task<ListResultDto<OrganizationUnitDto>> GetAllListAsync()
    {
        return OrganizationUnitAppService.GetAllListAsync();
    }

    [HttpPut("{id}/move")]
    public Task MoveAsync(Guid id, OrganizationUnitMoveDto input)
    {
        return OrganizationUnitAppService.MoveAsync(id, input);
    }

    [HttpGet("{id}/members")]
    public Task<PagedResultDto<IdentityUserDto>> GetMemberListAsync(Guid id, PagedResultRequestDto input)
    {
        return OrganizationUnitAppService.GetMemberListAsync(id, input);
    }

    [HttpGet("{id}/roles")]
    public Task<PagedResultDto<IdentityRoleDto>> GetRoleListAsync(Guid id, PagedResultRequestDto input)
    {
        return OrganizationUnitAppService.GetRoleListAsync(id, input);
    }
}
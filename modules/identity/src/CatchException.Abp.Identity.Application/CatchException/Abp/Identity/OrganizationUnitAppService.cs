using Microsoft.AspNetCore.Authorization;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Data;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Identity;
using Volo.Abp.ObjectExtending;

namespace CatchException.Abp.Identity;

[Authorize(IdentityPermissions.OrganizationUnits.Default)]
public class OrganizationUnitAppService :
    CrudAppService<OrganizationUnit,
        OrganizationUnitDto,
        Guid,
        GetOrganizationUnitInput,
        OrganizationUnitCreateDto,
        OrganizationUnitUpdateDto>,
    IOrganizationUnitAppService
{
    protected virtual OrganizationUnitManager Manager =>
        LazyServiceProvider.LazyGetRequiredService<OrganizationUnitManager>();

    public OrganizationUnitAppService(IRepository<OrganizationUnit, Guid> repository) : base(repository)
    {
    }

    public virtual async Task<ListResultDto<OrganizationUnitDto>> GetAllListAsync()
    {
        var ous = await Repository.GetListAsync();
        return new ListResultDto<OrganizationUnitDto>(
            ObjectMapper.Map<List<OrganizationUnit>, List<OrganizationUnitDto>>(ous));
    }

    [Authorize(IdentityPermissions.OrganizationUnits.Create)]
    public override async Task<OrganizationUnitDto> CreateAsync(OrganizationUnitCreateDto input)
    {
        var ou = new OrganizationUnit(GuidGenerator.Create(), input.DisplayName, input.ParentId);
        await Manager.CreateAsync(ou);

        return ObjectMapper.Map<OrganizationUnit, OrganizationUnitDto>(ou);
    }

    public override async Task<OrganizationUnitDto> UpdateAsync(Guid id, OrganizationUnitUpdateDto input)
    {
        var ou = await Repository.GetAsync(id);

        ou.SetConcurrencyStampIfNotNull(input.ConcurrencyStamp);

        ou.DisplayName = input.DisplayName;
        input.MapExtraPropertiesTo(ou);
        await Manager.UpdateAsync(ou);
        await CurrentUnitOfWork.SaveChangesAsync();

        return ObjectMapper.Map<OrganizationUnit, OrganizationUnitDto>(ou);
    }
}
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Identity;

namespace CatchException.Abp.Identity;

public class OrganizationUnitAppService :
    CrudAppService<OrganizationUnit,
        OrganizationUnitDto,
        Guid,
        GetOrganizationUnitInput,
        OrganizationUnitCreateDto,
        OrganizationUnitUpdateDto>,
    IOrganizationUnitAppService
{
    protected virtual OrganizationUnitManager Manager => LazyServiceProvider.LazyGetRequiredService<OrganizationUnitManager>();

    public OrganizationUnitAppService(IRepository<OrganizationUnit, Guid> repository) : base(repository)
    {
    }

    public virtual async Task<ListResultDto<OrganizationUnitDto>> GetAllListAsync()
    {
        var ous = await Repository.GetListAsync();
        return new ListResultDto<OrganizationUnitDto>(
            ObjectMapper.Map<List<OrganizationUnit>, List<OrganizationUnitDto>>(ous));
    }

    public override async Task<OrganizationUnitDto> CreateAsync(OrganizationUnitCreateDto input)
    {
        var ou = new OrganizationUnit(GuidGenerator.Create(), input.DisplayName, input.ParentId);
        await Manager.CreateAsync(ou);

        return ObjectMapper.Map<OrganizationUnit, OrganizationUnitDto>(ou);
    }
}
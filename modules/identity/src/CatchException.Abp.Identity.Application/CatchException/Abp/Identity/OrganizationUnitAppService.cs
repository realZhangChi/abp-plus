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
    public OrganizationUnitAppService(IRepository<OrganizationUnit, Guid> repository) : base(repository)
    {
    }

    public virtual async Task<ListResultDto<OrganizationUnitDto>> GetAllListAsync()
    {
        var ous = await Repository.GetListAsync();
        return new ListResultDto<OrganizationUnitDto>(
            ObjectMapper.Map<List<OrganizationUnit>, List<OrganizationUnitDto>>(ous));
    }
}
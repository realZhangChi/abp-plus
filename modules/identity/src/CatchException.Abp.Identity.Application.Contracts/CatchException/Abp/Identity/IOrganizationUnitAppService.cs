using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace CatchException.Abp.Identity;

public interface IOrganizationUnitAppService :
    ICrudAppService<
        OrganizationUnitDto,
        Guid,
        GetOrganizationUnitInput,
        OrganizationUnitCreateDto,
        OrganizationUnitUpdateDto>
{
    Task<ListResultDto<OrganizationUnitDto>> GetAllListAsync();
}
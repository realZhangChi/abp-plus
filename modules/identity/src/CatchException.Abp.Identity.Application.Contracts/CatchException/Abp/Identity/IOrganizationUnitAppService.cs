using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Identity;

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

    Task MoveAsync(Guid id, OrganizationUnitMoveDto input);

    Task<PagedResultDto<IdentityUserDto>> GetMemberListAsync(Guid id, PagedResultRequestDto input);

    Task<PagedResultDto<IdentityRoleDto>> GetRoleListAsync(Guid id, PagedResultRequestDto input);

    Task AddMemberAsync(Guid ouId, AddMemberDto input);
}
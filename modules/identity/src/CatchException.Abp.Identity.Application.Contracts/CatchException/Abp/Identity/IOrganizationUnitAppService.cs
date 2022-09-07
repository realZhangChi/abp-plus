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

    Task UpdateMemberAsync(Guid ouId, AddMemberDto input);

    Task DeleteMemberAsync(Guid ouId, Guid userId);

    Task UpdateRoleAsync(Guid id, AddRoleDto input);

    Task DeleteRoleAsync(Guid ouId, Guid roleId);
}